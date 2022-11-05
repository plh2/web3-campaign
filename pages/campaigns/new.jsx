import React, { useState } from "react";
import { Input, Button, Form, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import router from "next/router";

export default function NewCampaign() {
    const [minAmount, setMinAmount] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    async function handleCreateCampaign(e) {
        if (!minAmount) return;
        e.preventDefault();
        const accounts = await web3.eth.getAccounts();
        try {
            setLoading(true);
            setError('');
            await factory.methods.createCampaign(minAmount).send({
                from: accounts[0],
            });
            setMinAmount("");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Layout>
            <h3>Create a Campaign</h3>
            <Form onSubmit={handleCreateCampaign} error={!!error}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        value={minAmount}
                        onChange={(val) => setMinAmount(val.target.value)}
                        size="small"
                        placeholder="please input your Minimum amount"
                    />
                </Form.Field>
                {error && (
                    <Message negative>
                        <Message.Header>Error Message</Message.Header>
                        <p>{error}</p>
                    </Message>
                )}
                <Button loading={loading} primary>
                    Create
                </Button>
            </Form>
        </Layout>
    );
}
