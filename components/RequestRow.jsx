import React from "react";
import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campagin";

export default function RequestRow(props) {
    const {
        description,
        value,
        recipient,
        approvalCount,
        complete,
    } = props.request;
    const campaign = Campaign(props.address);
    const handleApprove = async () => {
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(props.id).send({
            from: accounts[0],
        });
    }
    const handleFinalize = async () => {
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(props.id).send({
            from: accounts[0],
        });
    }
    const readyToFinalize = approvalCount > approvalCount / 2;
    return (
        <Table.Row disabled={complete} positive={readyToFinalize && !complete}>
            <Table.Cell>{props.id + 1}</Table.Cell>
            <Table.Cell>{description}</Table.Cell>
            <Table.Cell>{web3.utils.fromWei(value, "ether")} ether</Table.Cell>
            <Table.Cell>{recipient}</Table.Cell>
            <Table.Cell>
                {approvalCount}/{props.approversCount}
            </Table.Cell>
            <Table.Cell>
                {(!complete) && <Button color="green" basic onClick={handleApprove}>Approve</Button>}
            </Table.Cell>
            <Table.Cell>
                {!complete && <Button color="teal" basic onClick={handleFinalize}>Finalize</Button>}
            </Table.Cell>
        </Table.Row>
    );
}
