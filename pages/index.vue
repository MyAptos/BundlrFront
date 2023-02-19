<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2">
          <!-- <v-btn @click="uploadFolder()">upload</v-btn> -->
          select folder to deploy
        </v-col>
        <v-col cols="10"
          ><span class="white--text">bb{{ output }}</span></v-col
        >
      </v-row>
    </v-container>
    <input
      type="file"
      name="files[]"
      id="files"
      multiple
      directory=""
      webkitdirectory=""
      moxdirectory=""
    />
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

    const folderInput = document.querySelector("#files");
    folderInput.addEventListener("change", () => {
      this.uploadFolder(folderInput.files);
    });
  },
  methods: {
    async uploadFolder(folders) {
      //   this.$axios.get("api/createFolder/pashu").then(async (res) => {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const formData = new FormData();
      for (let i = 0; i < folders.length; i++) {
        formData.append("files", folders[i]);
      }

        let upload = await axios.post(
          "http://localhost:8000/api/folderUpload",
          formData,
          config
        );
        

        let arweaveRate = await axios.get(
          "https://api.coinconvert.net/convert/ar/usd?amount=1"
        );
        let aptosRate = await axios.get(
          "https://api.coinconvert.net/convert/apt/usd?amount=1"
        );

        console.log("ar:", arweaveRate);
        console.log("rate", aptosRate);

        axios.get("http://localhost:8000/api/fund").then(async (res) => {
          let totalAR = (res.data / 1000000000000) * arweaveRate.data.USD;
          console.log("ar:", totalAR);

          let totalAPT = totalAR / aptosRate.data.USD;
          console.log("apt:", totalAPT);

          const payload = {
            arguments: [
              "0xca717d6cc82ec8f6146423e90b0fb79a753a9d5efb8e2c4f89772c3cd78cf8a0",
              "7177777",
            ],
            function: "0x1::coin::transfer",
            type: "entry_function_payload",
            type_arguments: ["0x1::aptos_coin::AptosCoin"],
          };
          // const NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";
          // const FAUCET_URL = "https://faucet.net.aptoslabs.com";
          const transaction = await window.aptos.signAndSubmitTransaction(
            payload
          );
          if (transaction) {
            console.log("deploying");
            socket.emit(
              "upload",
              "echo y | arkb deploy ss --wallet ./config/wallet.json --use-bundler https://node2.bundlr.network",
              200
            );
          }
        });
    },
  },
};
</script>
