import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

const Menus = ({ menuItems }) => {
  const firstLevelMenus = menuItems.filter(menuItem => {
    return menuItem.get("parentId").toString() === "0";
  });
  return (
    <div className="menu-wrapper horizontal">
      <ul className="menu-first-level">
        {firstLevelMenus.map(firstLevelMenu => {
          return (
            <MenuItems
              key={`menu-${firstLevelMenu.get("id")}`}
              item={firstLevelMenu}
              menuItems={menuItems}
            />
          );
        })}
      </ul>
    </div>
  );
};

const ChildMenuItem = ({ item, className, children }) => {
  return (
    <li className={className}>
      <NavLink to={item.get("path")}> {item.get("label")}</NavLink>
      {children}
    </li>
  );
};

const MenuItems = ({ item, menuItems }) => {
  const childMenuItems = menuItems.filter(menuItem => {
    return item.get("id").toString() === menuItem.get("parentId").toString();
  });
  return (
    <React.Fragment>
      <ChildMenuItem
        item={item}
        className={childMenuItems.size > 0 ? "menu-has-children" : ""}
      >
        {childMenuItems.size > 0 && (
          <ul>
            {childMenuItems.map(childMenu => {
              return (
                <MenuItems
                  key={`menu-${childMenu.get("id")}`}
                  item={childMenu}
                  menuItems={menuItems}
                />
              );
            })}
          </ul>
        )}
      </ChildMenuItem>
    </React.Fragment>
  );
};

export default Menus;
