import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from '../../styles/Charts.module.css';

interface BarChartData {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !ref.current || !containerRef.current) return;

    d3.select(ref.current).selectAll("*").remove();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const margin = { top: 20, right: 30, bottom: 40, left: 120 };

    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, 10])
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, height - margin.top - margin.bottom])
      .padding(0.1);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5))
      .selectAll("text")
      .style("fill", "#b0b0b0");
    svg.selectAll("line").style("stroke", "#b0b0b0");

    svg.append("g")
      .call(d3.axisLeft(y).tickSize(0).tickPadding(10))
      .selectAll("text")
      .style("fill", "#FFFFFF")
      .style("font-size", "14px");
    svg.selectAll("path").style("stroke", "none");

    const tooltip = d3.select("body").append("div")
      .attr("class", styles.tooltip)
      .style("opacity", 0);

    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", d => y(d.label)!)
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("fill", "#FF4500")
      .attr("width", 0)
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr("width", d => x(d.value));

    svg.selectAll<SVGRectElement, BarChartData>("rect")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`<strong>${d.label}</strong><br/>Average: ${d.value} / 10`)
          .style("left", (event.pageX + 15) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
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

export default BarChart;