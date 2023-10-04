const getAgentEndpoint =
    "select a.`id`, a.`agent_url` FROM `agent_service_test_map` ast JOIN `agents` a ON a.`id` = ast.`agent_id` WHERE ast.`service_test_id` = ?";
const InsertIntoServiceTestMetricDataTable =
    "INSERT INTO service_test_metric_data(`service_test_id`, `agent_id`, `request_start`, `request_end`,`request_wait`,`request_dns`,`request_tcp`,`request_tls`,`request_request_time`,`request_first_byte`, `request_download`,`request_total`,`service_status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

module.exports = {
    getAgentEndpoint,
    InsertIntoServiceTestMetricDataTable,
};
