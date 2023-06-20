const devConfig = {
  endpoints: {
    funnelUrl: 'https://testback.scorr-app.eu/funnels', // Development API endpoint URL
    pipelineStagesUrl: 'https://testback.scorr-app.eu/pipelines-stages',
    conversionRateUrl: 'https://testback.scorr-app.eu/conversion-rate',
    pipelinesUrl: 'https://testback.scorr-app.eu/pipelines2',
    storePipelinesUrl: 'https://testback.scorr-app.eu/store-pipelines',
    authorizationUrl: 'https://testback.scorr-app.eu/install',
    authorizationStatusUrl: 'https://testback.scorr-app.eu/authorization-status',
    pipelineNameUrl: 'https://testback.scorr-app.eu/pipelines-names',
    
  },
};

const prodConfig = {
  endpoints: {
    funnelUrl: 'https://backend.scorr-app.eu/funnels', // Production API endpoint URL
    pipelineStagesUrl: 'https://backend.scorr-app.eu/pipelines-stages',
    conversionRateUrl: 'https://backend.scorr-app.eu/conversion-rate',
    pipelinesUrl: 'https://backend.scorr-app.eu/pipelines2',
    storePipelinesUrl: 'https://backend.scorr-app.eu/store-pipelines',
    authorizationUrl: 'https://backend.scorr-app.eu/install',
    authorizationStatusUrl: 'https://testback.scorr-app.eu/authorization-status',
    pipelineNameUrl: 'https://testback.scorr-app.eu/pipelines-names',
  },
};

const env = 'production'; // 'development' or 'production'

const config = {
  endpoints: {},
};

if (env === 'development') {
  config.endpoints = devConfig.endpoints;
} else {
  config.endpoints = prodConfig.endpoints;
}

export default config;
