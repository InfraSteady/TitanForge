const axios = require("axios");
const { getConnection } = require("../db/connection.js");

const { getAgentEndpoint, InsertIntoServiceTestMetricDataTable } = require("../db/sql.js");

const agentDataRetrievalController = async (req, res) => {
    res.send("success");
    const connection = await getConnection();
    const serviceTestData = req.body;
    const [rows] = await connection.query(getAgentEndpoint, [serviceTestData.id]);
    for (const row of rows) {
        const baseURL = row.agent_url;
        const queryParams = {
            requestTestId: serviceTestData.id,
            requestEndpoint: serviceTestData.service_test_endpoint,
            requestType: serviceTestData.service_test_request_type,
            requestHeaders: serviceTestData.service_test_request_header,
            requestBody: serviceTestData.service_test_request_body,
            requestQueryParams: serviceTestData.service_test_request_query_param,
        };

        axios
            .get(baseURL, {
                params: queryParams,
            })
            .then(async (response) => {
                console.log("Response data:", response.data);
                const data = response.data;
                const requestTime = data.phases.total / 1000; //hopping that I will get access erviceTestData , otherwise need to make an query using id
                const serviceStatus =
                    requestTime >= serviceTestData.failed_response_time
                        ? 0
                        : requestTime < serviceTestData.failed_response_time && requestTime >= degrade_response_time
                        ? 1
                        : 2;
                await connection.query(InsertIntoServiceTestMetricDataTable, [
                    data.serviceTestId,
                    row.id,
                    data.start,
                    data.end,
                    data.phases.wait,
                    data.phases.dns,
                    data.phases.tcp,
                    data.phases.tls,
                    data.phases.request,
                    data.phases.firstByte,
                    data.phases.download,
                    data.phases.total,
                    serviceStatus,
                ]);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        return;
    }
};
module.exports = agentDataRetrievalController;
