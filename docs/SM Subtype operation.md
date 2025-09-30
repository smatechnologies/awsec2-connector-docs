---
sidebar_label: 'SM Subtype Operation'
---

# Solution Manager Sub-type Operation

It should be noted that all interactions with the Solution Manager sub-type can only be completed using Solution Manager.

The ACS AWSEC2 implementation provides a AWS EC2 job sub-type for defining the AWS EC2 jobs using Solution Manager.

Before defining jobs, the drop-down and config scripts and ACSAWSEC2 agent should be created (see installation section). 

## AWS EC2 Job Definition

When defining a AWSEC2 job, the job type of **AWSEC2** must be selected.
Once selected, a Task Type can be selected from the drop-down list.

The following tasks are available 

- **Create Instance**
- **Get Instance STatus By Tag** 
- **Start Instance**
- **Stop Instance**
- **Terminate Instance**

#### Create Instance Job definition
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

#### Get Instance Status By Tag Job definition
The Get Instance Status ByTag task type can be used to obtain the status of all instances defined within the region that are associated with the supplied user credentials or all instances that have the same tag value within the region that are associated with the supplied user credentials.  

Field                   | Description
----------------------- | -----------
**User ID**             | Required field that defines a user value that identifies which security credentials defined in the Connector.config file should be used for this request.
**Region**              | Required field that defines the region where the machine instance has or will be located. Select the appropriate location from the drop-down list.  
**Tag Name**            | When present the status of all instances that have the defined tag name in the selected region that are associated with the supplied user credentials will be retrieved. If the value is left empty then the status of all instances within the selected region that are associated with the supplied user credentials will be retrieved.  

#### Start Instance Job definition
The Start Instance task type can be used to start a defined instance or multiple defined instances or all instances that have a matching the Tag value.  The instances can be started by using either defining instance IDs or a TAG value.

Field                            | Description
-------------------------------- | -----------
**User ID**                      | Required field that defines a user value that identifies which security credentials defined in the Connector.config file should be used for this request.
**Region**                       | Required field that defines the region where the machine instance has or will be located. Select the appropriate location from the drop-down list.  
**Tag Name**                     | When present the status of all instances that have the defined tag name in the selected region that are associated with the supplied user credentials will be started. The TAG value overrides the defined instance values in the list.  
**Instances**                    | Enter names of instances that must be started - for each instance select **+ Add Item** and enter the value.
**Wait for Instance(s) Startup** | Optional field. When selected will wait for the started instances to be in a ***Running ok*** condition. If selected, it is possible to store information of the started instance in global properties
**ID Property**                  | Enter the name of a global property where the instance ID will be stored..
**DNS Property**                 | Enter the name of a global property where the instance DNS Address will be stored.
**Pub IPAdr Property**           | Enter the name of a global property where the instance Public IpAddress will be stored.
**Pri IPAdr Property**           | Enter the name of a global property where the instance Private IpAddress will be stored.

For a single instance, the values can be found in the property names.

For multiple instances, the values can be found in properties which have a counter value appended to them. In the above case, the instance ID will be saved in global property  MF_instanceId_1, the instance public DNS value in MF_DnsAdr_1, the instance public IP Address in MF_IpAdr_1 and the private IP Address in MF_PrIpAdr_1.
If creating or starting more than 1 instance, additional properties are created for each instance (i.e. instance 2 instance ID will be saved in property MF_instanceId_2, instance 3 instance ID will be saved in property MF_instanceId_3.

#### Stop Instance Job definition
The Stop Instance task type can be used to stop a defined instance or multiple defined instances or all instances that have a matching the Tag value.  The instances can be stopped by either defining instance IDs or a TAG value.

Field | Description
--------- | -----------
**User ID**                      | Required field that defines a user value that identifies which security credentials defined in the Connector.config file should be used for this request.
**Region**                       | Required field that defines the region where the machine instance has or will be located. Select the appropriate location from the drop-down list.  
**Tag Name**                     | When present the status of all instances that have the defined tag name in the selected region that are associated with the supplied user credentials will be started. The TAG value overrides the defined instance values in the list.  
**Instances**                    | Enter names of instances that must be stopped - for each instance select **+ Add Item** and enter the value.

#### Terminate Instance Job definition
The Terminate Instance task type can be used to remove a defined instance or multiple defined instances or all instances that have a matching the Tag value.  The instances can be terminated by either defining instance IDs or a TAG value.

Field | Description
--------- | -----------
**User ID**                      | Required field that defines a user value that identifies which security credentials defined in the Connector.config file should be used for this request.
**Region**                       | Required field that defines the region where the machine instance has or will be located. Select the appropriate location from the drop-down list.  
**Tag Name**                     | When present the status of all instances that have the defined tag name in the selected region that are associated with the supplied user credentials will be started. The TAG value overrides the defined instance values in the list.  
**Instances**                    | Enter names of instances t hath must be started - for each instance select **+ Add Item** and enter the value.

## Job Finished processing 

An AWSEC2 Scheduled JOB has the following possible return codes:

0	Success, the job completed processing.
1	Failure, an exception occurred during job processing.

This means that to check for a successful completion, the Failure Criteria should be set to NE (Not Equal) to 0.

## Logging

All information produced by the OpCon job is available in the job output and can be retrieved using the OpCon JORS capability. 
