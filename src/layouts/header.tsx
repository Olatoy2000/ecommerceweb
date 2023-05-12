import { Fragment, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactNode, ReactPortal, useContext, useEffect, useState } from "react";
import { Url } from "next/dist/shared/lib/router/router";

export default function HeaderLayout({ pageLabel }: any) {

  return (
    <header className="flex justify-between px-8 border-b bg-[#252735]  w-full border-b-[#F0F0F0]  border-b-opacity-80 py-[8px] items-center">
      <section className="flex justify-between gap-[9.75rem] items-center">
          <div className="flex gap-2 items-center text-white">
            {pageLabel.map((item: { link: Url; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined; }, idx: Key | null | undefined, arr: string | any[]) => (
              <Fragment key={idx}>
                <button>
                  {item.label}
                </button>
              </Fragment>
            ))}
          </div>
      </section>
      <p className="text-white text-[30px]">Shop</p>
        <div className="flex justify-end items-center border-l border-l-[#F0F0F0] dark:border-l dark:border-l-hrDarkMode-5 gap-6 pl-6 py-4">
           
          <div className="flex items-center gap-3">
              <img src="./default-profile-picture.png" className="w-8 h-8 rounded-full" alt="" />
            <p className="flex flex-col gap-2 font-medium text-xds-eneutral-11 dark:text-white">
              <span className="text-xs dark:text-[#C1C2C6]">User</span>
            </p>          
          </div>
        </div>
      {/* This is the header for our layout */}
    </header>
  );
}
