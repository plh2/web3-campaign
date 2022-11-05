import React from "react";
import { Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Link from "next/link";

export default function Header(props) {
    return (
        <Menu style={{ marginTop: "30px" }}>
            <Menu.Item>
                <Link href="/">CrowdCoin</Link>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Link href="/campaigns">Campaigns</Link>
                </Menu.Item>
                <Menu.Item>
                <Link href="/campaigns/new">+</Link>
                  </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}
