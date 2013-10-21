(function (ns, d3, _, $, undefined) {

    // implements the following interface
    /*
    {
        scale: returns the d3 scale for the type

        range: returns the d3 range for the type
    }
    */


    function TimeScale(data, options) {
        this.options = options;
        this.data = data;
    }

    TimeScale.prototype = {
        init: function () {
            delete this._scale;
        },

        scale: function (domain) {
            if(!this._scale) {
                this._scale = new d3.time.scale()
                    .domain(this.extractDomain(domain, this.options.xAxis.min, this.options.xAxis.max));

                this.range();
            }

            return this._scale;
        },

        axis: function () {
            var options = this.options.xAxis;
            var tickFormat = this.getOptimalTickFormat();
            var ticks = this.getOptimalTicks();
            return d3.svg.axis()
                .scale(this._scale)
                .tickFormat(tickFormat)
                .ticks(ticks)
                .tickSize(options.innerTickSize, options.outerTickSize)
                .tickPadding(options.tickPadding)
                .tickValues(this.options.xAxis.categories);
        },

        rangeBand: function () {
            return 0;
        },

        getOptimalTickFormat: function () {
            return d3.time.format('%d %b');
        },

        getOptimalTicks: function () {
            return d3.time.days;
        },

        range: function () {
            return this._scale.range([0, this.options.chart.plotWidth]);
        },

        extractDomain: function (domain, min, max) {
            if (min === undefined && max === undefined)
                return d3.extent(domain);

            if (min === undefined) {
                return [Math.min(domain[0], max), max];
            }

            if (max === undefined) {
                return [min, Math.max(min, domain[domain.length-1])];
            }

            return [min, max];
        }
    };

    _.nw = _.extend({}, _.nw, { TimeScale: TimeScale });

})('Narwhal', window.d3, window._, window.jQuery);