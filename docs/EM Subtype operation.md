---
sidebar_label: 'EM Subtype Operation'
title: 'Enterprise Manager sub-type operation'
description: 'Reference for all fields and operations available when defining AWS EC2 jobs using the Enterprise Manager sub-type.'
tags:
  - Reference
  - Automation Engineer
  - Jobs
  - Agents
---

# Enterprise Manager sub-type operation

## What is it?

The Enterprise Manager AWS EC2 sub-type provides a job definition interface for managing EC2 instances through OpCon jobs. When you select **AWS EC2** from the Job Sub-Type list for a Windows job, the sub-type displays fields for configuring the target region, operation, and operation-specific parameters.

- Use this sub-type when your OpCon environment uses Enterprise Manager and you need to automate EC2 instance management
- Use this sub-type to create, start, stop, terminate, or retrieve the status of EC2 instances as part of an automated schedule

Before defining jobs, complete the **AWS_REGIONS**, **AWS_IMAGES**, and **AWS_SIZES** global properties. These properties populate the lists used when creating instance definitions.

## Global properties

| Property | Description |
|---|---|
| **AWS_IMAGES** | A list of AMI images available in the EC2 environment. Each entry consists of a description and image name separated by a colon, enclosed in quotes, with multiple entries separated by commas. Format: `"description : image name"`. Image names can be added by editing the property. |
| **AWS_SIZES** | A list of virtual machine sizes available when creating instances. Each size entry is enclosed in quotes, with multiple entries separated by commas. Format: `"size"`. |
| **AWS_REGIONS** | A list of regions available for selection. Each region entry is enclosed in quotes, with multiple entries separated by commas. Format: `"region"`. |

## AWS EC2 job definition

The job sub-type has two portions: the upper section defines the connector location and AWS region; the lower section contains operation-specific fields.

### Upper section fields

| Field | Description |
|---|---|
| **Connector Location** | Required. The installed location of the AWS EC2 Connector (default value: `[[AWSEC2Path]]`). Do not change this value — define the location in the **AWSEC2Path** global property. |
| **User ID** | Required. Identifies which security credentials defined in the `Connector.config` file to use for this request. |
| **Region** | Required. The region where the instance is or will be located. Select from the list. Values are retrieved from the **AWS_REGIONS** global property. |
| **Operation** | Required. The operation to run. When an operation is selected, the corresponding tab appears in the lower section. Supported operations: **CreateInstance**, **GetInstanceStatusByTag**, **StartInstance**, **StopInstance**, **TerminateInstance**. |

### CreateInstance job definition

The CreateInstance operation creates a new machine (instance) in the AWS environment from a defined Amazon Machine Image (AMI). You can create multiple instances of the same AMI by setting the **Number** value to the desired count. If a Tag value is present, it is used as the name of the instance and can be referenced in subsequent operations.

If the virtual machine is to be created within a VPC environment, use the **Subnet ID** field. Otherwise, use the **Security Group** field.

| Field | Description |
|---|---|
| **Number** | Required. The number of instances to create. Default: `1`. |
| **Image ID** | Required. The Amazon Machine Image (AMI) to use. Select from the list. Values are retrieved from the **AWS_IMAGES** global property. |
| **Image Type** | Required. The instance type that defines the CPU, memory, and storage properties of the instance. Select from the list. Values are retrieved from the **AWS_SIZES** global property. |
| **Tag** | Optional. A name assigned to the instance being created. The tag value is used as the instance name and can be referenced in subsequent GetInstanceStatusByTag, StartInstance, StopInstance, and TerminateInstance jobs. Using a tag lets a single downstream job act on multiple instances. |
| **Security Group** | Mutually exclusive with the Subnet ID field. Either Security Group or Subnet ID must be present. If the security group does not exist, it is created during the CreateInstance job. |
| **Subnet ID** | Mutually exclusive with the Security Group field. Places the instance in an existing subnet within a VPC. The subnet must already exist — the connector does not create it. |
| **Key Name** | Required. The key used when accessing the created instance. If the key name does not exist, it is created during the CreateInstance job. |
| **Wait for Instance(s) Startup** | Optional. When selected, the job waits until all created instances reach a Running state before completing. |

### GetInstanceStatusByTag job definition

The GetInstanceStatusByTag operation retrieves the status of instances associated with the supplied user credentials in the selected region. You can retrieve all instances or filter by tag name.

| Field | Description |
|---|---|
| **Tag Name** | When present, retrieves the status of all instances with the specified tag name in the selected region. When left empty, retrieves the status of all instances in the selected region associated with the supplied user credentials. |

### StartInstance job definition

The StartInstance operation starts one or more stopped instances. Instances can be targeted by listing their IDs or by specifying a Tag value.

| Field | Description |
|---|---|
| **Tag Name** | When present, starts all instances with the specified tag name in the selected region. The Tag value overrides the Defined Instances list. |
| **Wait for Instance(s) Startup** | Optional. When selected, the job waits until all started instances reach a Running state before completing. |
| **Insert, Update, or Remove Instances** | Used to manage the Defined Instances list. To insert: enter the instance name and select **Add**. To update: select the instance from the list, update the value, and select **Update**. To remove: select the instance from the list and select **Remove**. |
| **Defined Instances** | A list of instance IDs to start. |

### StopInstance job definition

The StopInstance operation stops one or more running instances. Instances can be targeted by listing their IDs or by specifying a Tag value.

| Field | Description |
|---|---|
| **Tag Name** | When present, stops all instances with the specified tag name in the selected region. The Tag value overrides the Defined Instances list. |
| **Insert, Update, or Remove Instances** | Used to manage the Defined Instances list. To insert: enter the instance name and select **Add**. To update: select the instance from the list, update the value, and select **Update**. To remove: select the instance from the list and select **Remove**. |
| **Defined Instances** | A list of instance IDs to stop. |

### TerminateInstance job definition

The TerminateInstance operation removes one or more instances from the environment. Instances can be targeted by listing their IDs or by specifying a Tag value.

| Field | Description |
|---|---|
| **Tag Name** | When present, terminates all instances with the specified tag name in the selected region. The Tag value overrides the Defined Instances list. |
| **Insert, Update, or Remove Instances** | Used to manage the Defined Instances list. To insert: enter the instance name and select **Add**. To update: select the instance from the list, update the value, and select **Update**. To remove: select the instance from the list and select **Remove**. |
| **Defined Instances** | A list of instance IDs to terminate. |

### Properties

During CreateInstance and StartInstance operations, when **Wait for Instance(s) Startup** is selected, you can save instance values into OpCon properties. The connector uses the `[OPCON API INFORMATION]` settings in `Connector.config` to connect to the OpCon API.

| Field | Description |
|---|---|
| **Instance ID** | When present, the instance ID is saved to this property name with an appended counter value (for example, `propertyName_1`). |
| **Instance Public DNS** | When present, the public DNS value is saved to this property name with an appended counter value. |
| **Instance Public IPADR** | When present, the public IP address is saved to this property name with an appended counter value. |
| **Instance Private IPADR** | When present, the private IP address is saved to this property name with an appended counter value. |

For a single instance, values are saved in the specified property names. For multiple instances, values are saved in properties with a counter appended (for example, instance 1 saves to `MF_instanceId_1`, instance 2 to `MF_instanceId_2`, and so on).

## Job finished processing

An AWSEC2 job has the following return codes:

| Return code | Meaning |
|---|---|
| `0` | Success — the job completed processing |
| `1` | Failure — an exception occurred during job processing |

To detect failures, set the Failure Criteria to **NE** (Not Equal) to `0`.

## Logging

The connector writes to `awsec2.log` in the `log` subdirectory of the installation directory. Log files contain information about the AWSEC2 Connector and any jobs run by it. When a log file reaches 100 MB it rolls, and the rolled file is written to a month-named subdirectory with a date-stamped name — for example `log\2026-09\awsec2_2026-09-15.0.log`.

Rolled log files are retained indefinitely unless you configure pruning, so include the `log` directory in whatever disk monitoring you apply to the connector host.

All information produced by the OpCon job is also available through the OpCon JORS capability.

## FAQs

**What do I need to configure before defining AWS EC2 jobs?**

Complete the **AWS_REGIONS**, **AWS_IMAGES**, and **AWS_SIZES** global properties. These properties populate the region, image, and size lists in the job definition form.

**What are the return codes for an AWSEC2 job?**

Return code `0` indicates success. Return code `1` indicates failure. Set the Failure Criteria to **NE** (Not Equal) to `0` to detect failures correctly.

**How do I start or stop multiple instances at once?**

Add each instance ID to the Defined Instances list, or use a Tag value to target all instances with the same tag name. The Tag value takes precedence over the Defined Instances list when both are present.

**Where are the AWSEC2 Connector log files located?**

The active log is `awsec2.log` in the `log` subdirectory of the connector installation directory. Rolled files are written to a month-named subdirectory with a date-stamped name, and are retained indefinitely unless you configure pruning. See [Logging](#logging).

**Can I save instance properties to use in downstream jobs?**

Yes. When **Wait for Instance(s) Startup** is selected on a CreateInstance or StartInstance job, you can specify property names in the Properties section. The connector saves the instance ID, public DNS, public IP address, and private IP address to those properties via the OpCon API.

## Glossary

**AMI (Amazon Machine Image)** — A preconfigured template used to create EC2 instances, containing the operating system and additional software.

**Instance type** — A configuration that defines the CPU, memory, storage, and networking capacity of an EC2 instance (for example, `t2.micro`, `m5.large`).

**Tag** — A name assigned to an EC2 instance, used to identify and group instances for subsequent operations.

**Security group** — A virtual firewall controlling the protocols, ports, and IP ranges permitted to communicate with EC2 instances.

**Subnet ID** — The identifier of a subnet within a VPC, used to place an EC2 instance within a specific network segment.

**JORS (Job Output Retrieval System)** — The OpCon capability for retrieving job output produced on agent machines.

**AWS_IMAGES** — An OpCon global property containing a comma-separated list of AMI image entries used to populate the Image ID list in the job definition.

**AWS_SIZES** — An OpCon global property containing a comma-separated list of instance type entries used to populate the Image Type list in the job definition.

**AWS_REGIONS** — An OpCon global property containing a comma-separated list of AWS region identifiers used to populate the Region list in the job definition.

**Related topics:**

- [AWSEC2 Connector Overview](./overview.md)
- [Installation](./installation.md)
- [Solution Manager Sub-type Operation](./SM Subtype operation.md)
