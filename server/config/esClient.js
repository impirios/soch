import { Client } from "@elastic/elasticsearch";
import config from "./config";
const client = new Client({
    node:config.esUri
})
export default client;