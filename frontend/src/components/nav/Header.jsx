import React, { useState } from "react";
import { Menu } from "antd";
import {
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../actions/authActions";
const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("login");
  const dispatch = useDispatch();
  let history = useHistory();
  const state = useSelector((state) => state);
  console.log(state);
  const { user } = useSelector((state) => ({ ...state }));
  console.log("header", user);

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    dispatch(logOut());
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      {user.token && (
        <>
          <Menu.Item
            key="dashboard"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>

          <Menu.Item
            key="create"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link to="/create">Create</Link>
          </Menu.Item>

          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title={user.username}
            className="float-right"
          >
            <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Menu.Item>
          </SubMenu>
        </>
      )}

      {!user.token && (
        <>
          <Menu.Item
            key="register"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link to="/register">Register</Link>
          </Menu.Item>

          <Menu.Item
            key="login"
            icon={<UserOutlined />}
            className="float-right"
          >
            <Link to="/login">Login</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Header;
