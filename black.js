<script src='https://cdn.jsdelivr.net/gh/sabbirnewbd71-debug/myblog-template@refs/heads/main/main.js?v=2625559922'/>
      <script>//<![CDATA[
        if ("undefined" !== typeof eraMaterial) {
          eraMaterial.popup({
            style: "height=500, width=500, left=10, top=10, resizable=yes, scrollbars=yes, toolbar=yes, menubar=no, location=no, directories=no, status=yes"
          });
          eraMaterial.notranslate({
            selector: "pre, code"
          });
          eraMaterial.doubleclick({
            selector: "pre, code, kbd, mark, textarea, .link"
          });
          eraMaterial.ripple({
            selector: ".btn:not(.no-ripple), .toolbar-action, #drawer-list a, #drawer-list button, .dropdown-content ul > li, .dropdown-action, .accordion-toggle"
          });
          eraMaterial.toc({
            selector: ".post-body h3, .post-body .demo-heading",
            heading: "Table of Contents",
            listType: "ol",
            style: null,
            scrollAnim: true,
            scrollSpeed: 300,
            scrollOffset: -84
          });
          eraMaterial.anchor({
            title: "Link to this heading",
            heading: ".post-body h2, .post-body h3, .post-body h4"
          });
          eraMaterial.analytics({
            command: "blogger.send"
          });
          eraMaterial.clipboard({
            linkCopied: "Link copied to clipboard!",
            copied: "Copied to clipboard!",
            copy: "Copy",
            command: "blogger.send"
          });
          eraMaterial.snackbar({
            position: "snackbar-bottom snackbar-left"
          });
          eraMaterial.accordion({
            firstActive: false
          });
          eraMaterial.toolbar({
            hide: true,
            showBottom: false
          });
          eraMaterial.loadImages({
            throttle: 200,
            threshold: 200
          });
          eraMaterial.scrollIndicator(true);
          eraMaterial.stickyWidget(true);
          eraMaterial.shufflePosts(false);
          eraMaterial.antiInspect(false);
        }
        //]]></script>
      <b:if cond='data:view.isMultipleItems'>
        <script>
          var loadmoreSettings = {
            loading: &quot;Loading...&quot;
          };
          loadJS(&quot;https://cdn.jsdelivr.net/gh/sabbirnewbd71-debug/myblog-template@refs/heads/main/loadmore.min.js?v=2625559922&quot;)
        </script>
        <b:if cond='data:view.isHomepage'>
        <script>
          var featureSettings = {
            homepage: &quot;<data:blog.homepageUrl/>&quot;,
            max_results: &quot;12&quot;,
            posted_by: &quot;Posted by&quot;,
            lang: &quot;en&quot;,
            noimage: &quot;https://4.bp.blogspot.com/-1H0xACwGCqs/W_lG6hilsNI/AAAAAAAAAHg/hCs4hDWK7QMtBfzxOuGU5orcktky513IgCLcBGAs/s1600/noimage.png&quot;,
            mask: &quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXu7u6DSdFtAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==&quot;
          };
          loadJS(&quot;https://cdn.jsdelivr.net/gh/sabbirnewbd71-debug/myblog-template@refs/heads/main/feature.min.js?v=2625559922&quot;)
        </script>
        <script>//<![CDATA[
          var slider = tns({
            container:".slider-container",autoplayButtonOutput:false,arrowKeys:false,nextButton:".slider-next",prevButton:".slider-prev",
            items:2,responsive:{576:{items:3},768:{items:4},992:{items:5}},lazyload:false,nav:false,slideBy:"1",//]]>
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            speed: 600,
            mouseDrag: true,
            rewind: true,
            loop: false,
            gutter: 4,
            useLocalStorage: false
          })</script>
        </b:if>
        <script>
          var randomSettings = {
            homepage: &quot;<data:blog.homepageUrl/>&quot;,
            read_more: &quot;Read&quot;,
            loading_title: &quot;Loading...&quot;,
            close_title: &quot;Close&quot;,
            feature_title: &quot;Featured&quot;,
            snackbar: &quot;snackbar-bottom snackbar-right&quot;,
            space: &quot;&amp;nbsp; - &amp;nbsp;&quot;
          };
          loadJS(&quot;https://cdn.jsdelivr.net/gh/sabbirnewbd71-debug/myblog-template@main/random.min.js?v=2625559922&quot;)
        </script>
      </b:if>
      <b:if cond='data:view.isPost'>
        <script>
          var relatedSettings = {
            homepage: &quot;<data:blog.homepageUrl/>&quot;,
            /*<![CDATA[*/
            read_more: "Read",
            noimage: "https://4.bp.blogspot.com/-1H0xACwGCqs/W_lG6hilsNI/AAAAAAAAAHg/hCs4hDWK7QMtBfzxOuGU5orcktky513IgCLcBGAs/s1600/noimage.png",
            mask: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXu7u6DSdFtAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",
            snippet_length: 100,
            title_length: "auto",
            styles: 1, // or 2
            results: 6, // or 9
            blank: true // or false
          };
          loadJS("https://cdn.jsdelivr.net/gh/sabbirnewbd71-debug/myblog-template@main/related.min.js?v=2625559922");
          /*]]>*/
        </script>
      </b:if>
      <script>//<![CDATA[
        if ("undefined" !== typeof va) {
          va.ready(function() {
            // twemoji
            "undefined"!==typeof twemoji&&twemoji.parse(document.body,{callback:function(b,a,c){switch(b){case "a9":case "ae":case "2122":return!1}return"".concat(a.base,a.size,"/",b,a.ext)}});
            // adsense
            va.each(va.$$(".adsbygoogle"),function(){(adsbygoogle=window.adsbygoogle||[]).push({})});
            // your plugin here
          });
        }
        //]]></script>
