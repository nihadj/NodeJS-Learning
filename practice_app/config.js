var environments={};
environments.staging={
    'port': 3000,
    'envName': 'staging',
    'hashingSecret': 'thisIsASecret'
};
environments.production ={
    'port': 5000,
    'envName': 'production',
    'hashingSecret': 'thisIsAlsoASecret'
};
var environment=typeof(process.env.NODE_ENV)=='string'?process.env.NODE_ENV:'';
var environmentToExport=typeof(environments[environment])=='object'?environments[environment]:environments.staging;
module.exports=environmentToExport;

