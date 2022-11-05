import router from "next/router";
import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campagin";
import web3 from "../ethereum/web3";

export default function ContributeForm(props) {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const address = props.address;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const campaign = Campaign(address);
        try {
            setLoading(true);
            setError('');
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, "ether"),
            });
            router.reload();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Form onSubmit={handleSubmit} error={!!error}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    onChange={(e) => setValue(e.target.value)}
                    label="ether"
                    labelPosition="right"
                />
            </Form.Field>
            {error && (
                <Message negative>
                    <Message.Header>Error Message</Message.Header>
                    <p>{error}</p>
                </Message>
            )}
            <Button loading={loading} primary>
                Contribute!
            </Button>
        </Form>
    );
}
