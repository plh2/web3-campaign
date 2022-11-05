import Link from "next/link";
import router, { withRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import Campaign from "../../../../ethereum/campagin";
import web3 from "../../../../ethereum/web3";

export default withRouter(function NewRequest(props) {
    const { address = "" } = props.router.query;
    const [descript, setDescript] = useState("");
    const [value, setValue] = useState("");
    const [recipient, setRecipient] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const campaign = Campaign(address);
        try {
            const accounts = await web3.eth.getAccounts();
            setError("");
            setLoading(true);
            await campaign.methods
                .createRequest(
                    descript,
                    web3.utils.toWei(value, "ether"),
                    recipient
                )
                .send({ from: accounts[0] });
            router.replace(`/campaigns/${address}/requests`);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Layout>
            <Link href={`/campaigns/${address}/requests`}>
                <a>Back</a>
            </Link>
            <h3>Create a Request</h3>
            <Form onSubmit={handleSubmit} error={!!error}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        placeholder="Please input ..."
                        value={descript}
                        onChange={(e) => setDescript(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value of Ether</label>
                    <Input
                        placeholder="Please input ..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        placeholder="Please input ..."
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </Form.Field>
                {error && (
                    <Message negative>
                        <Message.Header>Error Message</Message.Header>
                        <p>{error}</p>
                    </Message>
                )}
                <Form.Field>
                    <Button loading={loading} primary>
                        request
                    </Button>
                </Form.Field>
            </Form>
        </Layout>
    );
});
