import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import Layout from "../../../components/Layout";
import Campagin from "../../../ethereum/campagin";
import web3 from "../../../ethereum/web3";
import { Button, Card, Grid } from "semantic-ui-react";
import ContributeForm from "../../../components/ContributeForm";
import Link from "next/link";

export default withRouter(function NewCampaigns(props) {
    const router = useRouter();
    const { address = "" } = props.router.query;
    const [minAmount, setMinAmount] = useState("");
    const [balance, setBalance] = useState("");
    const [requestLen, setRequestLen] = useState("");
    const [approverCount, setApproverCount] = useState("");
    const [manager, setManager] = useState("");
    async function init() {
        const { getSummary } = Campagin(address).methods;
        const accounts = await web3.eth.getAccounts();
        const {
            0: minimumContribution,
            1: balance,
            2: requestLength,
            3: approverCount,
            4: manager,
        } = await getSummary().call({
            from: accounts[0],
        });
        setMinAmount(minimumContribution);
        setBalance(balance);
        setRequestLen(requestLength);
        setApproverCount(approverCount);
        setManager(manager);
    }
    useEffect(() => {
        if (!router.isReady) return;
        init();
    }, [router.isReady]);
    const RenderCards = () => {
        const items = [
            {
                header: manager,
                meta: "Address of manager",
                description:
                    "The manager created this campaign and can create requests to withdraw money",
            },
            {
                header: minAmount,
                meta: "Minimum Contribution (wei)",
                description:
                    "You must contribute at least this much wei to became an approver",
            },
            {
                header: requestLen,
                meta: "Number of Requests",
                description:
                    "A request tries to withdraw money from the contract. Requests must be approved by approvers",
            },
            {
                header: approverCount,
                meta: "Number of approvers",
                description:
                    "Number of people who have already donated to this campaign.",
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign Balance (ether)",
                description:
                    "The balance is how much money this campaign has left to spend.",
            },
        ].map((e) => ({
            ...e,
            style: { wordBreak: "break-word", color: "red" },
        }));
        return <Card.Group items={items} />;
    };
    return (
        <Layout>
            <h3>Campaign Show</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <RenderCards />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link href={`/campaigns/${address}/requests`}>
                            <a>
                                <Button primary>Request</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    );
});
