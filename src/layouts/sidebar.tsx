import { Button, clsx } from "@mantine/core";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useStateValue } from "../store/useGlobalState";

type AsideType = {
  groupTitle: string;
  links: {
    title: string; 
    href?: string;
    routeID?: string;
  }[];
}[];

function Sidebar({}: any) {
  const showAdmin = true;
  const { pathname, push } = useRouter();
  const { state } = useStateValue()
  const sideLinksAdmin: AsideType = [
    {
      groupTitle: "Admin",
      links: [
        {
          title: "Show product",
          href: "/show-product",
          routeID: "show-product",
        },
        {
          title: "Show Cart",
          href: "/show-cart",
          routeID: "show-cart",
        },
        {
          title: "New Product",
          href: "/new-product",
          routeID: "/product",
        },
        {
            title: "View Order",
            href: "/view-order",
            routeID: "/view-order",
          },
        {
          title: "Logout",
        },
      ],
    },
  ];

  const sideLinksUser: AsideType = [
    {
      groupTitle: "User",
      links: [
        {
          title: "Show product",
          href: "/show-product",
          routeID: "show-product",
        },
        {
          title: "Show Cart",
          href: "/show-cart",
          routeID: "show-cart",
        },
        {
          title: "Logout",
        },
      ],
    },
  ];

 

  return (
      <>
        <div className="flex flex-col gap-8 border-r bg-[#F0F0F1] w-[280px] dark:border-r  border-r-[#F0F0F0]">        
          <ul className="flex flex-col pr-7 pl-9 pt-10 gap-6">           
            {state?.isAdmin ?           
              sideLinksAdmin.map((item, idx) => (
                <Fragment key={idx}>
                  {item.groupTitle && (
                    <li className="text-xds-eneutral-9 dark:text-[#C1C2C6]">{item.groupTitle}</li>
                  )}
                  {item.links.map((item, id) => (
                    <li key={id}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={clsx(
                            pathname.includes("item.routeID")
                              ? "bg-[#E1E5FA]  whitespace-nowrap p-2 rounded-md  font-semibold"
                              : " whitespace-nowrap font-medium",
                            "flex items-center gap-3"
                          )}>
                         
                          {item.title}
                        </Link>
                      ) : (
                        <span
                        onClick={() => push("/")}
                        className="flex cursor-pointer items-center font-medium gap-3 text-xds-eneutral-9">
                          {item.title}
                        </span>
                      )}
                    </li>
                  ))}
                </Fragment>
              )) 
              :
               (
                sideLinksUser.map((item, idx) => (
                  <Fragment key={idx}>
                    {item.groupTitle && (
                      <li className="text-xds-eneutral-9 dark:text-[#C1C2C6]">{item.groupTitle}</li>
                    )}
                    {item.links.map((item, id) => (
                      <li key={id}>
                        {item.href ? (
                          <Link
                            href={item.href}
                            className={clsx(
                              pathname.includes("item.routeID")
                                ? "bg-[#E1E5FA]  whitespace-nowrap p-2 rounded-md  font-semibold"
                                : " whitespace-nowrap font-medium",
                              "flex items-center gap-3"
                            )}>
                           
                            {item.title}
                          </Link>
                        ) : (
                          <span
                          onClick={() => push("/")}
                          className="flex cursor-pointer items-center font-medium gap-3 text-xds-eneutral-9">
                            {item.title}
                          </span>
                        )}
                      </li>
                    ))}
                  </Fragment>
                ))
            )
           }
           
          </ul>

        </div>    
      </>
  );
}

export default Sidebar;
