import config from "./server/config/config";
import app from "./server/config/express";
require('./server/config/mongoose')
app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
});

export default app;