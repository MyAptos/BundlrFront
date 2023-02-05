<template>
<div>
    <v-container>
        <v-row>
            <v-col cols="2">
                <v-btn @click="uploadFolder()">upload</v-btn>
            </v-col>
            <v-col cols="10"><span class="white--text">bb{{ output }}</span></v-col>
        </v-row>
    </v-container>
    <input type="file" name="files[]" id="files" multiple directory="" webkitdirectory="" moxdirectory="" />
</div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:8000");
import axios from "axios";

export default {
    data() {
        return {
            output: "",
        };
    },
    mounted() {
        socket.on("connect", () => {
            console.log("connected to server");
        });
        socket.on("output", (output) => {
            console.log("okokokok");
            this.output += output;
        });
    },
    methods: {
        async uploadFolder() {

            // let arweaveRate = await axios.get(
            //     "http://translate.google.com/translate?sl=ja&tl=en&u=https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=AR", {
            //         headers: {
            //             'X-CMC_PRO_API_KEY': '8db9c139-16c3-4504-80d3-a056c506d16a',
            //         },
            //     }
            // );
            // console.log(arweaveRate)
            // let aptosRate = await axios.get(
            //     "https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd"
            // );
            // const response = await window.aptos.connect();

            // const accessToken = "<access_token>";
            // const sourceAccount =
            //     "0x0b42f4ff6709c29b68a949bd705f6cc489e478e02db3d6a828cfbed1c7dde2ac";
            // const destinationAccount =
            //     "0xca717d6cc82ec8f6146423e90b0fb79a753a9d5efb8e2c4f89772c3cd78cf8a0";
            // const amount = 1;

            // const transferData = {
            //     source_account: sourceAccount,
            //     destination_account: destinationAccount,
            //     amount: amount,
            // };

            // const options = {
            //     headers: {
            //         // Authorization: `Bearer ${accessToken}`
            //     },
            // };

            // axios
            //     .post(
            //         "https://fullnode.testnet.aptoslabs.com/transfers",
            //         transferData,
            //         options
            //     )
            //     .then((response) => {
            //         console.log("Transfer successful");
            //     })
            //     .catch((error) => {
            //         console.error("Transfer failed");
            //     });

            //   axios
            //     .get("http://localhost:8000/api/fund")
            //     .then(async (res) => {
            //       console.log(res.data);
            //       console.log("rate", arweaveRate);
            //       let totalAR =
            //         (res.data / 1000000000000) * arweaveRate.data.arweave.usd;
            //       console.log("ar:", totalAR);

            //       let totalAPT = totalAR / aptosRate.data.aptos.usd;
            //       console.log("apt:", totalAPT);

            const payload = {
                arguments: ['0xca717d6cc82ec8f6146423e90b0fb79a753a9d5efb8e2c4f89772c3cd78cf8a0', '7177777'],
                function: '0x1::coin::transfer',
                type: 'entry_function_payload',
                type_arguments: ['0x1::aptos_coin::AptosCoin'],
            };
            const NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";
            const FAUCET_URL = "https://faucet.net.aptoslabs.com";
            const pendingTransaction = await window.aptos.signAndSubmitTransaction(
                payload
            );

            // socket.emit(
            //     "upload",
            //     "echo y | arkb deploy rr --wallet ./config/wallet.json --use-bundler https://node2.bundlr.network",
            //     200
            // );
        },
    },
};
</script>
