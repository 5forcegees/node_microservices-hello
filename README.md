This is the hello microservice for the node microservices app

Structure:
    hello.js - The main function file for the microservice.  Contains the function/logic that gets exposed to the 
        gateway server via the service.js file.
        
    service.js - maps hello.js to the appropriate port and protocol
        
    utilities/ - contains support functions
        transformer.js - contains the logic for aggregating the responses from esb/ldap/http into a single object for 
            returning to the front end app
        
    package.json - aside from the usual dependencies on npm modules we are adding our own custom libraries
        they will be cloned from our repository when npm install is executed. Example:
              "dependencies": {
                    "application-configuration": "git+ssh://git@innersource.accenture.com/nmi/application-configuration.git",
              }
        we have also included a script that deletes the custom modules on every install so that they update properly 
        (semantic versioning isn't supported with git repos)
            $ npm run reinstall
            
        there is also a script to set up symlinks to the custom libraries (only works on mac/linux)
            this allows the developer to incorporate changes to the libraries without having to commit/push/reinstall
            it assumes that the libraries are stored in the relative location ../../libraries/
            $ npm run linklibs
            
        see the syntax in package.json for details
    
    test/ - contains the tests for the microservice
        test.js  - contains the test logic and examples.  
            if this gets too big we should break it out into separate files
            
    postman/ - contains a postman collection designed to demonstrate the capabilities of the microservice
        newman/ - contains a newman scipt to execute the postman collection
            usage: 
                # from the microservice root folder
                cd postman/newman
                # execute script
                node newman.js

        
##To Run Mocha and Generate Istanbul Reports

```
  istanbul cover _mocha -- -u exports -R spec
```
* will create ./coverage where report html will output
* if you have any issues running istanbul try installing globally


