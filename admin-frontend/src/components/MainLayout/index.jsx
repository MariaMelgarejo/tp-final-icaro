import { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TfiPanel } from "react-icons/tfi";
import { MdProductionQuantityLimits, MdOutlineSell } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUsers, FaUserCog } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

import ProfileImage from "../../assets/images/profile.png";

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    const { user, logout, isLoggedIn } = useAuthStore((state) => {
        return {
            user: state.user,
            logout: state.logout,
            isLoggedIn: state.isLoggedIn,
        };
    });
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    useEffect(() => {
        if (user == null || !isLoggedIn) {
            navigate("/");
        }
    }, [user, isLoggedIn]);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h2 className="text-white fs-5 text-center py-4">
                        <span className="sm-logo">E</span>
                        <span className="lg-logo">Ecommerce</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    onClick={({ key }) => {
                        if (key == "signout") {
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: "",
                            icon: <TfiPanel />,
                            label: "Panel de Control",
                        },
                        {
                            key: "categorias",
                            icon: <BiSolidCategoryAlt />,
                            label: "Categorías",
                        },
                        {
                            key: "productos",
                            icon: <MdOutlineSell />,
                            label: "Productos",
                        },
                        {
                            key: "ventas",
                            icon: <MdProductionQuantityLimits />,
                            label: "Ventas",
                        },
                        {
                            key: "clientes",
                            icon: <FaUsers />,
                            label: "Clientes",
                        },
                        {
                            key: "administradores",
                            icon: <FaUserCog />,
                            label: "Administradores",
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className="d-flex justify-content-between ps-3 pe-5"
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div className="d-flex">
                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                <li className="breadcrumb-item text-sm">
                                    <a
                                        className="opacity-5 text-dark"
                                        href="/admin"
                                    >
                                        Inicio
                                    </a>
                                </li>
                                <li
                                    className="breadcrumb-item text-sm text-dark active"
                                    aria-current="page"
                                >
                                    Panel de Control
                                </li>
                            </ol>
                            <h6 className="font-weight-bolder mb-0">
                                Panel de Control
                            </h6>
                        </nav>
                    </div>
                    <div className="d-flex gap-4 align-items-center ">
                        <div className="position-relative">
                            <IoNotificationsOutline className="fs-4" />
                            <span className="position-absolute badge rounded-pill bg-danger">
                                3
                            </span>
                        </div>
                        <div className="d-flex gap-3 align-items-center">
                            <div>
                                <img
                                    className="header-profile"
                                    src={ProfileImage}
                                    alt="profile"
                                />
                            </div>
                            <div>
                                <h5 className="mb-0">
                                    {auth.state.user.firstname}
                                </h5>
                                <p className="mb-0">Administrador</p>
                            </div>
                        </div>
                        <div>
                            <button
                                className="btn btn-sm btn-danger mb-0"
                                onClick={logout}
                            >
                                Salir
                            </button>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
