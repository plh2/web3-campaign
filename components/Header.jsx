import React from "react";
import { Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Link from "next/link";

export default function Header(props) {
    return (
        <Menu style={{ marginTop: "30px" }}>
            <Menu.Item>
                <Link href="/">
                    <a>CrowdCoin</a>
                </Link>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Link href="/">
                        <a>Campaigns</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/campaigns/new">
                        <a>+</a>
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}
