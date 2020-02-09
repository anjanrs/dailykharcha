import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { withHandlers, compose } from "recompose";

const renderChildMenuItem = ({ item, className, children, handleOnClick }) => {
  return (
    <li className={className} onClick={handleOnClick}>
      <NavLink to={item.get("path")}> {item.get("label")}</NavLink>
      {children}
    </li>
  );
};
const ChildMenuItem= compose(
  withHandlers({
    handleOnClick: ({item, onClick})=> event => {
      onClick(event)(item);
    }
  })
)(renderChildMenuItem);

const MenuItems = ({ item, menuItems, onClick }) => {
  const childMenuItems = menuItems.filter(menuItem => {
    return item.get("id").toString() === menuItem.get("parentId").toString();
  });
  return (
    <React.Fragment>
      <ChildMenuItem onClick={onClick}
        item={item}
        className={childMenuItems.size > 0 ? "menu-has-children" : ""}
      >
        {childMenuItems.size > 0 && (
          <ul>
            {childMenuItems.map(childMenu => {
              return (
                <MenuItems onClick={onClick}
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


const Menus = ({ menuItems, onMenuItemClick }) => {
  const firstLevelMenus = menuItems.filter(menuItem => {
    return menuItem.get("parentId").toString() === "0";
  });
  return (
    <div className="menu-wrapper horizontal">
      <ul className="menu-first-level">
        {firstLevelMenus.map(firstLevelMenu => {
          return (
            <MenuItems onClick={onMenuItemClick}
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


export default Menus;
