import React, { useEffect, useState } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Index() {
    const [addressList, setAddressList] = useState([]);
    const [loading, setLoading] = useState(false);
    async function init() {
        setLoading(true);
        const factory = await import("../ethereum/factory");
        const campaigns = await factory.default.methods
            .getDeployedCampaigns()
            .call();
        setAddressList(campaigns);
        setLoading(false);
    }
    useEffect(() => {
        init();
    }, []);
    const CardList = () => {
        const itemDOM = addressList.map((address) => {
            return {
                key: address,
                header: address,
                description: (
                    <Link href={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true,
            };
        });
        return <Card.Group items={itemDOM} />;
    };
    return (
        <Layout>
            <div
                style={{
                    width: "100%",
                    display: "inline-flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                }}
            >
                <div
                    style={{
                        flex: "1",
                        minHeight: "100px",
                        display: "inline-flex",
                        justifyContent: "center",
                        marginRight: "20px",
                    }}
                >
                    <div>{loading && <Icon loading name="spinner" />}</div>
                    <CardList />
                </div>
                <Link href="/campaigns/new">
                    <a>
                        <Button
                            style={{ width: "200px" }}
                            icon
                            labelPosition="left"
                            primary
                        >
                            <Icon name="add circle" />
                            <span>Create Campaign</span>
                        </Button>
                    </a>
                </Link>
            </div>
        </Layout>
    );
}
