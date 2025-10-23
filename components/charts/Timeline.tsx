import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from '../../styles/Charts.module.css';

interface TimelineData {
  date: Date;
  score: number;
  label: string;
}

interface TimelineProps {
  data: TimelineData[];
}

const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !ref.current || !containerRef.current) return;

    d3.select(ref.current).selectAll("*").remove();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const tooltip = d3.select("body").append("div")
      .attr("class", styles.tooltip)
      .style("opacity", 0);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, 10]) // Danger Score
      .range([height - margin.top - margin.bottom, 0]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("fill", "#b0b0b0");

    svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("fill", "#b0b0b0");
    
    svg.selectAll("line, path").style("stroke", "#b0b0b0");

    svg.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.score))
      .attr("r", 5)
      .style("fill", "#FF4500")
      .style("opacity", 0.7)
      .style("stroke", "white")
      .attr("r", 0)
      .transition()
      .duration(500)
      .delay((d, i) => i * 2)
      .attr("r", 5);

    svg.selectAll<SVGCircleElement, TimelineData>("circle")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`<strong>${d.date.toLocaleDateString()}</strong><br/>${d.label}<br/>Danger: ${d.score}`)
          .style("left", (event.pageX + 15) + "px")
          .style("top", (event.pageY - 28) + "px");
        d3.select(event.currentTarget).style("fill", "#00A86B");
      })
      .on("mouseout", (event) => {
        tooltip.transition().duration(500).style("opacity", 0);
        d3.select(event.currentTarget).style("fill", "#FF4500");
      });

    // Cleanup tooltip on unmount
    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <div ref={containerRef} className={styles.chartContainer}>
      <svg ref={ref} />
    </div>
  );
};

export default Timeline;