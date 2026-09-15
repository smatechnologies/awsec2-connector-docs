---
sidebar_label: 'SM Subtype Operation'
title: 'Solution Manager sub-type operation'
description: 'Reference for all task types and fields available when defining AWSEC2 jobs using the Solution Manager sub-type.'
tags:
  - Reference
  - Automation Engineer
  - Jobs
  - Agents
  - Solution Manager
---

# Solution Manager sub-type operation

## What is it?

The Solution Manager AWSEC2 sub-type provides a job definition interface for managing EC2 instances through OpCon jobs in Solution Manager. When you select the **AWSEC2** job type, you can select a task type to define the specific operation to perform.

- Use this sub-type when your OpCon environment uses the Solution Manager interface and OpCon Release 25.0.3 or higher
- Use this sub-type to create, start, stop, terminate, or retrieve the status of EC2 instances as part of an automated schedule

:::info Note

All interactions with the Solution Manager sub-type must be completed using Solution Manager.

:::

Before defining jobs, complete the **Drop-down Script** and **Config Script** and create the ACSAWSEC2 agent. See the [Installation](./installation.md) page for instructions.

## AWS EC2 job definition

When defining an AWSEC2 job, select the job type **AWSEC2**, then select a task type from the list.

The following task types are available:

- **Create Instance**
- **Get Instance Status By Tag**
- **Start Instance**
- **Stop Instance**
- **Terminate Instance**

### Create Instance job definition

The Create Instance task type creates a new machine (instance) in the AWS environment from a defined Amazon Machine Image (AMI). You can create multiple instances of the same AMI by setting the **Number** value. If a Tag value is present, it is used as the instance name and can be referenced in subsequent operations.

If the virtual machine is to be created within a VPC environment, use the **Subnet ID** field. Otherwise, use the **Security Group** field.

| Field | Description |
|---|---|
| **Number** | Required. The number of instances to create. Default: `1`. |
| **Image ID** | Required. The Amazon Machine Image (AMI) to use. Select from the list. |
| **Image Type** | Required. The instance type that defines the CPU, memory, and storage properties of the instance. Select from the list. |
| **Tag** | Optional. A name assigned to the instance being created. The tag value is used as the instance name and can be referenced in subsequent GetInstanceStatusByTag, StartInstance, StopInstance, and TerminateInstance jobs. |
| **Security Group** | Mutually exclusive with the Subnet ID field. Either Security Group or Subnet ID must be present. If the security group does not exist, it is created during the Create Instance job. |
| **Subnet ID** | Mutually exclusive with the Security Group field. Places the instance in an existing subnet within a VPC. The subnet must already exist — the connector does not create it. |
| **Key Name** | Required. The key used when accessing the created instance. If the key name does not exist, it is created during the Create Instance job. |
| **Wait for Instance(s) Startup** | Optional. When selected, the job waits until all created instances reach a Running state before completing. |

### Get Instance Status By Tag job definition

The Get Instance Status By Tag task type retrieves the status of instances in the selected region associated with the supplied user credentials. You can retrieve all instances or filter by tag name.

| Field | Description |
|---|---|
| **User ID** | Required. Identifies which security credentials defined in the `Connector.config` file to use for this request. |
| **Region** | Required. The region where the instance is located. Select from the list. |
| **Tag Name** | When present, retrieves the status of all instances with the specified tag name in the selected region. When left empty, retrieves the status of all instances in the selected region associated with the supplied user credentials. |

### Start Instance job definition

The Start Instance task type starts one or more stopped instances. Instances can be targeted by listing their IDs or by specifying a Tag value.

| Field | Description |
|---|---|
| **User ID** | Required. Identifies which security credentials defined in the `Connector.config` file to use for this request. |
| **Region** | Required. The region where the instance is located. Select from the list. |
| **Tag Name** | When present, starts all instances with the specified tag name in the selected region. The Tag value overrides the Instances list. |
| **Instances** | Enter the names of instances to start. For each instance, select **+ Add Item** and enter the value. |
| **Wait for Instance(s) Startup** | Optional. When selected, the job waits until all started instances reach a Running state. When selected, you can store instance information in global properties. |
| **ID Property** | The name of a global property where the instance ID is stored. |
| **DNS Property** | The name of a global property where the instance DNS address is stored. |
| **Pub IPAdr Property** | The name of a global property where the instance public IP address is stored. |
| **Pri IPAdr Property** | The name of a global property where the instance private IP address is stored. |

For a single instance, values are saved in the specified property names. For multiple instances, values are saved in properties with a counter appended (for example, `MF_instanceId_1`, `MF_DnsAdr_1`, `MF_IpAdr_1`, `MF_PrIpAdr_1` for instance 1, and `MF_instanceId_2` for instance 2, and so on).

### Stop Instance job definition

The Stop Instance task type stops one or more running instances. Instances can be targeted by listing their IDs or by specifying a Tag value.

| Field | Description |
|---|---|
| **User ID** | Required. Identifies which security credentials defined in the `Connector.config` file to use for this request. |
| **Region** | Required. The region where the instance is located. Select from the list. |
| **Tag Name** | When present, stops all instances with the specified tag name in the selected region. The Tag value overrides the Instances list. |
| **Instances** | Enter the names of instances to stop. For each instance, select **+ Add Item** and enter the value. |

### Terminate Instance job definition

The Terminate Instance task type removes one or more instances from the environment. Instances can be targeted by listing their IDs or by specifying a Tag value.

| Field | Description |
|---|---|
| **User ID** | Required. Identifies which security credentials defined in the `Connector.config` file to use for this request. |
| **Region** | Required. The region where the instance is located. Select from the list. |
| **Tag Name** | When present, terminates all instances with the specified tag name in the selected region. The Tag value overrides the Instances list. |
| **Instances** | Enter the names of instances to terminate. For each instance, select **+ Add Item** and enter the value. |

## Job finished processing

An AWSEC2 job has the following return codes:

| Return code | Meaning |
|---|---|
| `0` | Success — the job completed processing |
| `1` | Failure — an exception occurred during job processing |

To detect failures, set the Failure Criteria to **NE** (Not Equal) to `0`.

## Logging

All information produced by the OpCon job is available through the OpCon JORS capability.

## FAQs

**Can I use Enterprise Manager to manage Solution Manager sub-type jobs?**

No. All interactions with the Solution Manager sub-type must be completed using Solution Manager.

**What are the return codes for an AWSEC2 job?**

Return code `0` indicates success. Return code `1` indicates failure. Set the Failure Criteria to **NE** (Not Equal) to `0` to detect failures correctly.

**How do I add multiple instances to a Start Instance or Stop Instance job?**

Select **+ Add Item** for each instance you want to include in the job definition.

**What happens if I specify both a Tag Name and a list of instances?**

The Tag value takes precedence and overrides the Instances list.

**Where is job output stored?**

Job output is available through the OpCon JORS capability and can be retrieved using Solution Manager.

**What must be set up before defining AWSEC2 jobs in Solution Manager?**

The **Drop-down Script**, **Config Script**, and ACSAWSEC2 agent must be created before defining jobs. See the [Installation](./installation.md) page for instructions.

## Glossary

**Task type** — The specific operation to perform within an AWSEC2 job definition. Available task types are Create Instance, Get Instance Status By Tag, Start Instance, Stop Instance, and Terminate Instance.

**Tag** — A name assigned to an EC2 instance, used to identify and group instances for subsequent operations. When a Tag value is specified in a Start, Stop, or Terminate job, it targets all instances with that tag name.

**AMI (Amazon Machine Image)** — A preconfigured template used to create EC2 instances, containing the operating system and additional software.

**Instance type** — A configuration that defines the CPU, memory, storage, and networking capacity of an EC2 instance (for example, `t2.micro`, `m5.large`).

**Security group** — A virtual firewall controlling the protocols, ports, and IP ranges permitted to communicate with EC2 instances.

**Subnet ID** — The identifier of a subnet within a VPC, used to place an EC2 instance within a specific network segment.

**JORS (Job Output Retrieval System)** — The OpCon capability for retrieving job output produced on agent machines.

**Related topics:**

- [AWSEC2 Connector Overview](./overview.md)
- [Installation](./installation.md)
- [Enterprise Manager Sub-type Operation](./EM Subtype operation.md)
