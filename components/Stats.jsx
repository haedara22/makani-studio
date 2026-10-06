'use client'
import { stats } from "@/app/data";
import React from "react";
import CountUp, { useCountUp } from "react-countup";

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
    <div className="container mx-auto">
      <div className="md:flex md:flex-row md:flex-wrap md:gap-7 flex flex-col items-start gap-3 max-w-[80vw] mx-auto xl:max-w-none ">
        {stats.map((item, index) => {
          return (
            <div className="flex items-center justify-center flex-1 gap-4 xl:justify-start" key={index}>
              <CountUp
                end={item.num}
                duration={5}
                delay={2}
                className="text-4xl font-extrabold text-accent-Default xl:text-6xl"
              />
              <p className={`${item.text.length < 15 ? "max-w-[100px]" : "max-w-[240px]"} leading-snug text-primaryText/80`}>{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
    </section>
  );
};

export default Stats;
