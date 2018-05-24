/* All of tests are placed within the $() function,
 * since some of these tests require DOM elements. This
 *ensure they don't run until the DOM is ready.
 */
$(function () {
    describe('RSS Feeds', function () {
        /* This test ensures that
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL and the URL is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });
        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name and the name is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });



    describe('The menu', function () {
        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. It
         * have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes its visibility when the menu icon is clicked', function () {
            var menuIcon = $('.menu-icon-link');

            menuIcon.click(); //HTML DOM click() method simulates a mouse-click on an element. Source: https://www.w3schools.com/jsref/met_html_click.asp
            expect($('body').hasClass('menu-hidden')).toBe(false); //first click shows menu

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true); //second click hides menu 
        });
    });

    describe('Initial Entries', function () {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so
         * beforeEach() and done() are used.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('contains at least a single entry element', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            console.log($('.feed .entry').length);
        });
    });

    describe('New Feed Selection', function () {
        var container = $('.feed'),
            containerFirst,
            containerSecond;
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                containerFirst = container.html();
                loadFeed(1, function () {
                    containerSecond = container.html();
                    done();
                });
            });
        });

        it('changes the content when a new feed is loaded', function () {
            expect(containerFirst).not.toEqual(containerSecond);
        });
    });
}());