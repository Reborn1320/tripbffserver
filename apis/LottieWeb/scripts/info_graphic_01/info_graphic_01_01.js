var draw_01_01 = (function () {

    function drawContent(svgBase, trip) {
        let startPoint_px = paddingLeftRight,
            startPoint_py = h - content_height - footer_height + c_paddingTop;   

        let location = trip.locations[0],
        locationName = capitalizeFirstLetter(location.name) + ".",
        feeling = location.feeling ? 'Feeling ' + location.feeling : "",
        activity = location.activity,
        highlights = location.highlights.toLowerCase(),
        nodeFeelingActivity = "";

        if (activity) nodeFeelingActivity = capitalizeFirstLetter(activity.toLowerCase());
        if (feeling) {
            feeling = capitalizeFirstLetter(feeling.toLowerCase());
            nodeFeelingActivity = nodeFeelingActivity ? nodeFeelingActivity + '. ' + feeling : feeling;
        }
        if (nodeFeelingActivity) nodeFeelingActivity += ".";

        if (highlights) highlights = capitalizeFirstLetter(highlights) + ".";

        let locationName_px = startPoint_px,
        locationName_py = startPoint_py;

        let locationNameNode = drawText(svgBase, {
                y: locationName_py,
                x: locationName_px
            }, locationName, { 
                color: globalConfig.location.name.color,
                font: globalConfig.location.name.fontFamily,
                fontSize: globalConfig.location.name.fontSize,
                fontWeight: globalConfig.location.name.fontWeight,
                textAnchor: globalConfig.location.name.textAnchor,
                textTransform: globalConfig.location.name.textTransform,
                wrapNumber: w - paddingLeftRight
            });
        let locationNameNodeBbox = locationNameNode.node().getBBox();

        let feelingActivityNode = drawText(svgBase, {
            y: locationNameNodeBbox.y + locationNameNodeBbox.height + globalConfig.location.paddingTop,
            x: locationName_px
        }, nodeFeelingActivity, { 
            color: globalConfig.location.description.color,
            font: globalConfig.location.description.fontFamily,
            fontSize: globalConfig.location.description.fontSize,
            textAnchor: globalConfig.location.description.textAnchor,
            wrapNumber: w - paddingLeftRight 
        });
        let feelingActivityNodeBbox = feelingActivityNode.node().getBBox();
        let hightlightNode = drawText(svgBase, {
            y: feelingActivityNodeBbox.y + feelingActivityNodeBbox.height + globalConfig.location.paddingTop,
            x: locationName_px
        }, highlights, { 
            color: globalConfig.location.description.color,
            font: globalConfig.location.description.fontFamily,
            fontSize: globalConfig.location.description.fontSize,
            textAnchor: globalConfig.location.description.textAnchor,
            wrapNumber: w - paddingLeftRight 
        });

        let hightlightNodeBbox = hightlightNode.node().getBBox();
        drawText(svgBase, {
            y: hightlightNodeBbox.y + hightlightNodeBbox.height + globalConfig.location.paddingTop,
            x: locationName_px
        }, "MORE INFO: WWW.TRIPBFF.COM", { 
            color: globalConfig.footer.color,
            font: globalConfig.footer.fontFamily,
            fontSize: globalConfig.footer.fontSize,
            textAnchor: globalConfig.footer.textAnchor,
            wrapNumber: w - paddingLeftRight 
        });
    }

    function drawImage(svgBase, coordinate, uri, config) {
        svgBase.append("svg:image")
        .attr('id', 'img01')
        .attr('x', coordinate.x)
        .attr('y', coordinate.y)
        .attr('width', config.width)
        .attr("xlink:href", uri); 
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function drawText(svgBase, coordinate, text, config) {
        var svgCanvas = svgBase.append("text");
        svgCanvas
            .attr("y", coordinate.y)
            .attr("x", coordinate.x)
            .style('text-anchor', config.textAnchor)
            .style('text-transform', config.textTransform)
            .style("font-size", config.fontSize)
            .style("font-weight", config.fontWeight)
            .attr("font-family", config.font)
            .attr("fill", config.color)
            .attr("name", config.name)
            .text(text)
            .call(wrap, config.wrapNumber);
        return svgCanvas;
    }

    function wrap(text, width) {
        text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            x = text.attr("x"),
            dy = 0.35,
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));

            if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            let lineText = line.join(" ");

            if (lineNumber == globalConfig.location.lineNumber) {
                lineText = lineText + "...";
                tspan.text(lineText);
                break;
            }

            tspan.text(lineText);
            line = [word];
            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
        });
    }

    var globalConfig = {
        infographic: {
            width: 1280,
            height: 1280,
            content_height: 300,
            paddingLeftRight: 20,
            c_paddingTop: 60,
            footer_height: 0,
            background: "#e3d1a2"
        },
        location: {
            name: {
                fontSize: "64px",
                fontFamily: "Sans Serif",
                color: "#d0363b",
                fontWeight: "bold",
                textAnchor: "start",
                textTransform: "uppercase"
            },
            description: {
               fontSize: "48px",
               fontFamily: "Times Neue Roman",
               color: "#121113",
               textAnchor: "start",
            },  
            paddingTop: 30,
            lineNumber: 1
        },
        footer: {
            color: "#121113",
            font: "Times Neue Roman",
            fontSize: "30px",
            textAnchor: "start",
        }
    }

    var w = globalConfig.infographic.width,
        h = globalConfig.infographic.height,
        content_height = globalConfig.infographic.content_height,
        footer_height = globalConfig.infographic.footer_height,
        paddingLeftRight = globalConfig.infographic.paddingLeftRight,
        c_paddingTop = globalConfig.infographic.c_paddingTop;
    
    function drawBackground(svgBase, backgroundColor) {
        svgBase.style('background-color', backgroundColor);
    }

    function draw(trip) {

        var viewBox = "0 0" + " " + w + " " + h;
        var svgBase = d3.select("#info-graphic-base")    
            .attr("width", w)
            .attr("height", h)
            .attr("viewBox", viewBox);
            
        var imgUri = "./data/images/2.jpg";
        var img = new Image();
        img.onload = function() {
            var ratio = this.width / this.height; 
            h = w / ratio;          
            
            h += content_height + footer_height;
            viewBox = "0 0" + " " + w + " " + h;
            
            svgBase
            .attr("height", h)
            .attr("viewBox", viewBox)
            .attr("preserveAspectRatio", "xMinYMin meet");

            drawBackground(svgBase, globalConfig.infographic.background);

            drawImage(svgBase, {
                y: 0,
                x: 0 
            }, imgUri, {
                width: w
            });      

            drawContent(svgBase, trip);
        };
        img.src = imgUri;
    }

    return {
        draw: draw
    }
})();

