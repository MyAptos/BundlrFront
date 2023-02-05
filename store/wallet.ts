// import {
//     AptosAccount,
//     AptosClient,
//     FaucetClient,
//     TokenClient,
// } from "aptos"

// export const state = () => ({
//   aptos:''
// })

// export const mutations = {
//     setAptos(state,payload){
//         state.aptos=payload
//     }
// }
// export const actions = {
//     async transfer(context) {

//         const transaction = {
//             arguments: ['0xca717d6cc82ec8f6146423e90b0fb79a753a9d5efb8e2c4f89772c3cd78cf8a0', '717'],
//             function: '0x1::coin::transfer',
//             type: 'entry_function_payload',
//             type_arguments: ['0x1::aptos_coin::AptosCoin'],
//         };
//         console.log(context.state)

//         try {
//             // const pendingTransaction = context.state.aptos.signAndSubmitTransaction(transaction);
//             // const client = new AptosClient('https://testnet.aptoslabs.com');
//             // const txn = await client.waitForTransactionWithResult(
//             //     pendingTransaction.hash,
//             // );
//             // console.log('tx;', txn)
//         } catch {

//         }
//     }
// }