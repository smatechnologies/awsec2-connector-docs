---
sidebar_label: 'EM Subtype Operation'
---

# Enterprise Manager Sub-type Operation

The Enterprise Manager includes a Windows AWS EC2 job sub-type for defining the AWS EC2 jobs. The job sub-type can be accessed by selecting AWS EC2 from the Job Sub-Type drop down 
list when the Windows Job Type has been selected. 

Before defining jobs, the global properties AWS_REGIONS, AWS_IMAGES and AWS_SIZES should be completed. These global properties hold the definitions that populate the drop-down 
lists used when creating the definitions to create a virtual machine in the EC2 environment.

Name            | Description
--------------- | -----------
**AWS_IMAGES**  | This contains a list of images that can be installed in the EC2 environment. The information consists of a description and the image name separated by a colon. Information for a virtual machine is entered within quotes and multiple entries are separated by a comma (i.e. ***"description : image name","description : image name"***). Image names can be added to the drop-down list by editing the property. The format of item must be ***"description : image"***.
**AWS_SIZES**   | This contains a list of virtual machine sizes that can be used when creating the virtual machine. The information consists of the size. Information for a virtual machine size is entered within quotes and multiple entries are separated by a comma (i.e. ***"size”,”size”***). .
**AWS_REGIONS** | This contains a list of regions that can be selected. Information for a region is entered within quotes and multiple entries are separated by a comma (i.e. ***“region”,”region”***). 

## AWS EC2 Job Definition

The job sub-type consists of two portions with the upper portion defining the location information of the connector, the AWS region where the instance will be created or of an existing instance that the operation must be performed. The connector supports operations to **create**, **start**, **stop**, **terminate** and **retrieve** the status of the instances. 
 
### Upper Section Fields.

Field | Description
------------ | -----------
**Connector Location**  | Required field and contains the installed location of the AWS EC2 Connector (default value [[AWSEC2Path]]). This should not be changed and the location should be defined in the **JAWSEC2Path** property.
**User ID**             | Required field that defines a user value that identifies which security credentials defined in the Connector.config file should be used for this request.
**Region**              | Required field that defines the region where the machine instance has or will be located. Select the appropriate location from the drop-down list. Values for the drop-down list are retrieved from the **AWS_REGIONS** global property. 
**Operation**           | Required field that contains the Operation to execute. When an Operation is selected the appropriate TAB will be visible in the lower section of the Job definition. Supported operations are **CreateInstance**, **GetInstanceStatusByTag**, **StartInstance**, **StopInstance** and **TerminateInstance**.  

### Lower Section Fields.
The lower section of the job sub-type definition contains the operation information. When an operation is selected, the appropriate TAB will be displayed.

#### CreateInstance Job definition
The CreateInstance Operation can be used to create a new machine (instance) in the AWS environment from a defined Amazon Machine Image (AMI). It is possible to create several instances of the same AMI by setting the Number value to the number of machines to create (the default is 1). The Image ID and the Image Type are selected from the drop-down lists. If a Tag is present, the value will be used as the Name of the instance. The Tag definition can then be used on subsequent Operations.

If the virtual machine is to be created within a VPC (Virtual Private Cloud) environment the Subnet ID field must be used, otherwise the Security group field must be used.
If the entered Security Group does not exist, it will created. If the entered Key Name does not exist, it will be created. 

Field | Description
--------- | -----------
**Number**                       | Required field and contains the number of instances to create. The default is **1**.
**Image ID**                     | Required field and contains the name of an Amazon Machine Image (AMI) defined in the AWS environment. Select the appropriate image from the drop-down list. Values for the drop-down list are retrieved from the **AWS_IMAGES** global property. 
**Image Type**                   | Required field and contains the name of an Amazon Image Type that defines the properties of the instance to create. Select the appropriate type from the drop-down list. Values for the drop-down list are retrieved from the **AWS_SIZES** global property.
**Tag**                          | Optional field that defines a name that will be attached to the instance being created. The value will be assigned as the name of the instance and can used on subsequent **GetInstanceStatusByTag**, **StartInstance**, **StopInstance** and **TerminateInstance** jobs. Using this value allows you to specify a single **StartInstance**, **StopInstance** or **TerminateInstance** job to execute functions on multiple instances.
**Security Group**               | The Security Group field is mutually exclusive with Subnet ID field. Either the Security group or Subnet ID field must be present.
**Subnet ID**                    | Required field and contains the name of a database connection defined in the connector Connector.config file to use when retrieving the status of the report processing. Defines the security environment associated with the instance. This allows groups of machines to be isolated within your defined region. If the security group does not exist, it will be created during the CreateInstance job execution.
**Key Name**                     | Required field that defines a key that is used when accessing the created instance. If the key name does not exist, it will be created during the **CreateInstance** job execution.
**Wait for Instance(s) Startup** | Optional field. When selected will wait for the created instances to be in a ***Running ok*** condition.

#### GetInstanceStatusByTag Job definition
The GetInstanceStatusByTag Operation can be used to obtain the status of all instances defined within the region associated that are associated with the supplied user credentials or all instances that have the same tag value within the region that are associated with the supplied user credentials.  

Field | Description
--------- | -----------
**Tag Name**                     | When present the status of all instances that have the defined tag name in the selected region that are associated with the supplied user credentials will be retrieved. If the value is left empty then the status of all instances within the selected region that are associated with the supplied user credentials will be retrieved.  

#### StartInstance Job definition
The StartInstance Operation can be used to start a defined instance or multiple defined instances or all instances that have a matching the Tag value.  The instances can be started by using either defining instance IDs or a TAG value.

Field | Description
--------- | -----------
**Tag Name**                     | When present the status of all instances that have the defined tag name in the selected region that are associated with the supplied user credentials will be started. The TAG value overrides the defined instance values in the list.  
**Wait for Instance(s) Startup** | Optional field. When selected will wait for the started instances to be in a ***Running ok*** condition.
**Insert**, **Update** or **Remove** Instances | Used to Insert, Update or Remove Instances from the Defined Instances list. To insert an instance, enter the name and select the Add button. To Update an instance value, select the Instance in the Defined Instances list, then update it and select the Update button. To remove an instance from the Defined Instances list, select the instance in the Defined Instances list and then select the Remove button.
**Defined Instances**            | Contains a list of instance ID’s that will be started. 

#### StopInstance Job definition
The StopInstance Operation can be used to stop a defined instance or multiple defined instances or all instances that have a matching the Tag value.  The instances can be stopped by either defining instance IDs or a TAG value.

Field | Description
--------- | -----------
**Tag Name**                     | When present the status of all instances that have the defined tag name in the selected region that are associated with the supplied user credentials will be stopped. The TAG value overrides the defined instance values in the list.  
**Insert**, **Update** or **Remove** Instances | Used to Insert, Update or Remove Instances from the Defined Instances list. To insert an instance, enter the name and select the Add button. To Update an instance value, select the Instance in the Defined Instances list, then update it and select the Update button. To remove an instance from the Defined Instances list, select the instance in the Defined Instances list and then select the Remove button.
**Defined Instances**            | Contains a list of instance ID’s that will be stopped. 

#### TerminateInstance Job definition
The TerminateInstance Operation can be used to remove a defined instance or multiple defined instances or all instances that have a matching the Tag value.  The instances can be terminated by either defining instance IDs or a TAG value.

Field | Description
--------- | -----------
**Tag Name**                     | When present the status of all instances that have the defined tag name in the selected region that are associated with the supplied user credentials will be terminated. The TAG value overrides the defined instance values in the list.  
**Insert**, **Update** or **Remove** Instances | Used to Insert, Update or Remove Instances from the Defined Instances list. To insert an instance, enter the name and select the Add button. To Update an instance value, select the Instance in the Defined Instances list, then update it and select the Update button. To remove an instance from the Defined Instances list, select the instance in the Defined Instances list and then select the Remove button.
**Defined Instances**            | Contains a list of instance ID’s that will be terminated. 

#### Properties
During CreateInstance and StartInstance operations, if the Wait for Instance(s) Startup has been selected, it is possible to insert the instance identifier, the instance public DNS address, the instance public IP Address and the instance private IP Address values into properties within the OpCon Environment. The connector uses the **[OPCON API INFORMATION]** definitions in the Connector.config to establish a connection to the OpCon-API of the OpCon system. 

Field | Description
--------- | -----------
**Instance ID**                  | When present the instance ID will be saved in this property name with an appended counter value (i.e. ***name_counter value***).    
**Instance Public DNS**          | When present the public DNS value will be saved in this property name with an appended counter value (i.e. ***name_counter value***).   
**Instance Public IPADR**        | When present the public IP Address will be saved in this property name with an appended counter value (i.e. ***name_counter value***).    
**Instance Private IPADR**       | When present the private IP Address will be saved in this property name with an appended counter value (i.e. ***name_counter value***).  

For a single instance, the values can be found in the property names.

For multiple instances, the values can be found in properties which have a counter value appended to them. In the above case, the instance ID will be saved in global property  MF_instanceId_1, the instance public DNS value in MF_DnsAdr_1, the instance public IP Address in MF_IpAdr_1 and the private IP Address in MF_PrIpAdr_1.
If creating or starting more than 1 instance, additional properties are created for each instance (i.e. instance 2 instance ID will be saved in property MF_instanceId_2, instance 3 instance ID will be saved in property MF_instanceId_3.

## Job Finished processing 

A AWSEC2 Scheduled JOB has the following possible return codes:

0	Success, the job completed processing.
1	Failure, an exception occurred during job processing.

This means that to check for a successful completion, the Failure Criteria should be set to NE (Not Equal) to 0.

## Logging

The default logging implemented by the connector consists of a maximum cycle of five log files. The log files contain information about the AWSEC2 Connector and any jobs run by the AWSEC2 Connector. The log files (awsec2.log - awsec2.log.5) are located in the ***installation_dir***\log directory. Information is appended into the log files and any error messages, return codes can be viewed in these log files.

All information produced by the OpCon job is available in the job output and can be retrieved using the OpCon JORS capability. 
