describe('Bar chart', function () {

    var el, $el, nw;
    beforeEach(function () {
        $el = $('<div>');
        el = $el.get(0);
    });

    function createNarwhal(options) {
        options = _.extend({ el: el, chart: { animations: false } }, options);
        var narwhal = new Narwhal(options).cartesian().horizontal();
        return narwhal;
    }

    describe('given simple data', function () {
        var data = [];
        beforeEach(function () {
            data = [1,2,3];
        });

        it('should create one rect per data point', function () {
            createNarwhal().bar(data).render();
            var rects = $el.find('rect');
            expect(rects.length).toBe(3);
        });

        it('should add the Bar class to each Bar', function () {
            createNarwhal().bar(data).render();
            var rects = $el.find('rect');

            expect(rects.filter('.bar').length).toBe(3);
        });

        it('should add the tooltip-tracker class to each Bar', function () {
            createNarwhal().bar(data).render();
            var rects = $el.find('rect');

            expect(rects.filter('.tooltip-tracker').length).toBe(3);
        });

        it('should set the width of each Bar to the corresponding yScale value', function () {
            var nw = createNarwhal().bar(data).render();
            var rects = $el.find('rect');
            var x = function (d) { return nw.yScale(d); };

            expect(+rects.eq(0).attr('width')).toBe(x(data[0]));
            expect(+rects.eq(1).attr('width')).toBe(x(data[1]));
            expect(+rects.eq(2).attr('width')).toBe(x(data[2]));
        });
    });

    describe('given multiple series with simple data arrays', function () {
        beforeEach(function () {
            nw = narwhal.bar([
                    { name: 's1', data: [1,2,3] },
                    { name: 's2', data: [4,4,4] }
                ]).render();
        });

    });

    describe('given multiple series with uneven data (ie. null values in some series)', function () {
        beforeEach(function () {
            nw = createNarwhal().bar([
                { name: 's1', data: [1,null,3] },
                { name: 's2', data: [4,5,3] },
                { name: 's3', data: [4,null,4] }
            ]).render();
        });

        it('should behave correctly', function () {
            var rects = _.filter($el.find('rect'), function (r) { return +$(r).attr('width') > 0; });
            expect(rects.length).toBe(7);
        });

    });


});
