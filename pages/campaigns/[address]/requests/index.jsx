import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Icon, Label, Menu, Table } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import RequestRow from "../../../../components/RequestRow";
import Campaign from "../../../../ethereum/campagin";

export default withRouter(function RequestList(props) {
    const { address = "" } = props.router.query;
    const router = useRouter();
    const [requests, setRequests] = useState([]);
    const [approversCount, setApproversCount] = useState("");
    async function init() {
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();
        setApproversCount(approversCount);
        const requests = await Promise.all(
            Array(+requestCount)
                .fill()
                .map((_, i) => campaign.methods.requests(i).call())
        );
        setRequests(requests);
    }

    useEffect(() => {
        if (!router.isReady) return;
        init();
    }, [router.isReady]);

    const RenderRow = () => {
        return requests.map((request, i) => (
            <RequestRow
                address={address}
                approversCount={approversCount}
                key={i}
                request={request}
                id={i}
            />
        ));
    };
    return (
        <Layout>
            <h3>Request List</h3>
            <Link href={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary floated="right" style={{ marginBottom: 10 }}>New Request</Button>
                </a>
            </Link>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Recipient</Table.HeaderCell>
                        <Table.HeaderCell>Approval Count</Table.HeaderCell>
                        <Table.HeaderCell>Approve</Table.HeaderCell>
                        <Table.HeaderCell>Finalize</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <RenderRow />
                </Table.Body>
            </Table>
            <div>Found {requests.length} requests.</div>
        </Layout>
    );
});
