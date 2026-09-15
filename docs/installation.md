---
sidebar_label: 'Installation'
title: 'AWSEC2 Connector installation'
description: 'How to install and configure the AWSEC2 Connector, including Enterprise Manager and Solution Manager sub-type setup.'
tags:
  - Procedural
  - System Administrator
  - Agents
  - Getting Started
---

# AWSEC2 Connector installation

## What is it?

The AWSEC2 Connector installation consists of multiple steps required to run the connector with OpCon. This page describes how to install and configure the connector and the associated Enterprise Manager or Solution Manager sub-type.

- Use this procedure when setting up the AWSEC2 Connector for the first time
- Use this procedure when adding the Enterprise Manager or Solution Manager sub-type to an existing connector installation

## Supported software levels

The following software versions are required to implement the AWSEC2 Connector:

- OpCon Release 25.0.3 or higher (required for Solution Manager sub-type)
- OpCon Release 19.0 or higher (required for Enterprise Manager sub-type)
- OpCon REST API
- Embedded OpenJDK Version 11 (included with the connector)

## Installation overview

The installation process consists of the following steps:

1. Install the AWS EC2 Connector
2. Configure the AWS EC2 Connector
3. For Enterprise Manager sub-type:
   - Add the AWS EC2 Connector job sub-type to Enterprise Manager
   - Create the global properties the sub-type uses
4. For Solution Manager sub-type:
   - Create the AWSEC2 scripts
   - Create the AWSEC2 agent

## Install the AWS EC2 Connector

The AWS EC2 Connector can be installed on any Windows Server that has an OpCon Windows Agent installed.

- When installing using the Enterprise Manager sub-type, the connector can be installed on any Windows system that contains a Windows agent
- When installing using the Solution Manager sub-type, the connector must be installed on either the same Windows server as the OpCon installation or the same Windows server as the Relay installation

To install the connector, complete the following steps:

1. Copy the supplied install file `AWSEC2Connector-win.zip` to the target Windows server.
2. Extract the contents into the installation directory.

After extraction, the root installation directory contains the following items:

- `awsec2.exe` — the connector executable
- `EncryptValue.exe` — the credential encoding utility
- `Connector.config` — the connector configuration file
- `java/` — directory containing OpenJDK 11
- `emplugins/` — directory containing the Enterprise Manager job sub-type plugin

## Configure the AWS EC2 Connector

To configure the connector, complete the following steps:

1. Open the `Connector.config` file in the installation directory.
2. Set the required values as described in the table below.
3. Save the file.

All user and password values placed in the configuration file must be encoded using the `EncryptValue.exe` utility.

### EncryptValue utility

The EncryptValue utility encodes a credential value so that it is not stored in plain text. It accepts a `-v` argument and displays the encoded result.

To encode a value on Windows, run the following command:

```
EncryptValue.exe -v "abcdefg"
```

:::caution

Encoding obscures a credential; it does not protect it. A value produced by `EncryptValue.exe` can be reversed by anyone who can read it, so treat `Connector.config` as a file that contains live credentials:

- Restrict access to the file using file system permissions, so that only the account running the connector and the administrators who maintain it can read it.
- Never paste a value from a working `Connector.config` into a support ticket, a screenshot, a repository, or documentation. Replace credential values with placeholders before sharing the file.
- Give the AWS user only the EC2 permissions the connector needs, so that an exposed key has limited reach.
- Rotate the AWS access key and the OpCon API token on the schedule your organization uses for service credentials.

:::

### Connector.config settings

| Property | Description |
|---|---|
| **[CONNECTOR]** | Section header |
| **CONNECTOR_NAME** | Optional. A label for the connector. |
| **MAX_WAIT_TIME_FOR_STARTUP** | Required. The maximum time in minutes to wait for startup completion before terminating the requested action and returning an error. There is no default. |
| **DEBUG** | Required. Enables debug mode. Value: `ON` or `OFF`. There is no default. |
| **[USER1]** | Section header. Identifies which security credentials to use for a request. You choose the header name, and the **User ID** value in the job definition must match it exactly. Add one section per set of credentials — for example `[USER1]` and `[USER2]`. |
| **CONNECTOR_USER_ACCESS_KEY** | The user access key for the AWS EC2 environment. Must be encoded using EncryptValue. |
| **CONNECTOR_USER_SECRET_KEY** | The matching user secret key. Must be encoded using EncryptValue. |
| **[OPCON API INFORMATION]** | Section header |
| **ADDRESS** | The address of the OpCon REST API server, including the port number. Use port 9000 for non-TLS or port 9010 for TLS. Format: `address:port`. |
| **USING_TLS** | Indicates whether the server uses TLS. Value: `True` or `False` (default: `True`). |
| **TOKEN** | An application token that authenticates requests to the OpCon API. |

:::info Note

`MAX_WAIT_TIME_FOR_STARTUP` and `DEBUG` are required and have no default value — set both. `USING_TLS` does default to `True` if you omit it. Use the example below as the reference for a complete file.

:::

The following is an example `Connector.config` file. Every value in angle brackets is a placeholder — replace each one with a value from your own environment. Do not copy credential values from any other environment into this file.

```
[CONNECTOR]
CONNECTOR_NAME=AWS EC2 Connector
MAX_WAIT_TIME_FOR_STARTUP=10
DEBUG=OFF

[USER1]
CONNECTOR_USER_ACCESS_KEY=<encoded AWS access key ID>
CONNECTOR_USER_SECRET_KEY=<encoded AWS secret access key>

[OPCON API INFORMATION]
ADDRESS=<OpCon API host>:9010
USING_TLS=True
TOKEN=<OpCon API token>
```

## Enterprise Manager sub-type installation

To install the Enterprise Manager sub-type, complete the following steps:

1. Copy the Enterprise Manager plugin from the `installation_dir\emplugins` directory to the `dropins` directory of the Enterprise Manager installation. If the `dropins` directory does not exist, create it off the root installation directory.
2. Restart Enterprise Manager. A new Windows job sub-type called **AWS EC2** will be visible. If the sub-type does not appear, restart Enterprise Manager using **Run as Administrator**.

### Create the AWSEC2Path global property

Create a global property named **AWSEC2Path** that contains the full path of the connector installation directory.

### Create the special global properties

The Amazon EC2 connector uses three global properties to hold the values of images, regions, and sizes available in the job definition lists.

| Property | Description |
|---|---|
| **AWS_IMAGES** | Create this property and add the image values using a comma to separate entries. Retain the double quotes surrounding each value. Format: `"description : image"`. |
| **AWS_SIZES** | Create this property and add the size values using a comma to separate entries. Retain the double quotes surrounding each value. Format: `"size"`. |
| **AWS_REGIONS** | Create this property and add the region values using a comma to separate entries. Retain the double quotes surrounding each value. Format: `"region"`. |

The following are example values for each property:

```
List of Virtual Machines

"Microsoft Windows Server 2016 Base : ami-0f4c7e570f044b46f","Amazon Linux AMI 2018.03.0 : ami-0080e4c5bc078760e","Red Hat Enterprise Linux 7.6 (HVM) : ami-011b3ccf1bd6db744"

List of Virtual Machine Sizes

"a1.medium","a1.large","a1.xlarge","a1.2xlarge","a1.4xlarge","m4.large","m4.xlarge","m4.2xlarge","m4.4xlarge","m4.10xlarge","m4.16xlarge","m5.large","m5.xlarge","m5.2xlarge","m5.4xlarge","m5.12xlarge","m5.24xlarge","m5a.large","m5a.xlarge","m5a.2xlarge","m5a.4xlarge","m5a.12xlarge","m5a.24xlarge","m5d.large","m5d.xlarge","m5d.2xlarge","m5d.4xlarge","m5d.12xlarge","m5d.24xlarge","t2.nano","t2.micro","t2.small","t2.medium","t2.large","t2.xlarge","t2.2xlarge","t3.nano","t3.micro","t3.small","t3.medium","t3.large","t3.xlarge","t3.2xlarge"

List of Regions

"AP_NORTHEAST_1","AP_NORTHEAST_2","AP_SOUTH_1","AP_SOUTHEAST_1","AP_SOUTHEAST_2","CA_CENTRAL_1","CN_NORTH_1","CN_NORTHWEST_1","EU_CENTRAL_1","EU_NORTH_1","EU_WEST_1","EU_WEST_2","EU_WEST_3","SA_EAST_1","US_EAST_1","US_GOV_EAST_1","US_WEST_1","US_WEST_2"
```

## Solution Manager sub-type installation

:::info Note

All interactions with the Solution Manager sub-type must be completed using Solution Manager.

:::

To install the Solution Manager sub-type, complete the following steps:

1. Download the `ACSAWSEC2` zip file from the FTP site under **OpCon Releases** > **Integrations** > **AWSEC2**.
2. Extract the `ACSAWSEC2` directory and copy it into `\SAM\plugins` for OpCon and Relay installations.
3. For OpCon installations: stop and restart the **SMA OpCon RestAPI** and **SMA OpCon Service Manager** services. For Relay installations: stop and restart the **Relay Service**.

### Create the scripts

When using the Solution Manager sub-type, two scripts must be created. The first script contains the Connector.config information and the second script contains the list information.

To create the scripts, complete the following steps:

1. Go to **Library** and select **Scripts**.
2. Select **Script Types** from the upper right corner.
   a. Select **+Add**.
   b. In the **Name** field, enter `ACSAWSEC2`.
   c. In the **File Extension** field, enter `txt`.
   d. In the **Description** field, enter `Used for ACSAWSEC2 Integration`.
   e. Select **Save**.
3. Select **Script Runners** from the upper right corner.
   a. Select **+Add**.
   b. In the **Name** field, enter `ACSAWSEC2`.
   c. In the **OS** field, select **AWSEC2** from the list.
   d. In the **Type** field, select **ACSAWSEC2** from the list.
   e. In the **Command** field, enter `cmd.exe /c`.
   f. Select **Save**.
4. Select **Scripts** from the upper right corner.
5. Create the Connector.config script:
   a. Select **+Add**.
   b. In the **Name** field, enter a name for the script. It is recommended to use the proposed agent name with `_config` appended (for example, `MyAgent_config`).
   c. In the **Type** field, select **ACSAWSEC2** from the list.
   d. Assign the required roles.
   e. In the **Script** area, paste the contents of the created `Connector.config` file.
   f. Select **Save**.
6. Create the list information script:
   a. Select **+Add**.
   b. In the **Name** field, enter a name for the script. It is recommended to use the proposed agent name with `_data` appended (for example, `MyAgent_data`).
   c. In the **Type** field, select **ACSAWSEC2** from the list.
   d. Assign the required roles.
   e. In the **Script** area, paste the data script content shown below.
   f. Select **Save**.

The data script content uses `IMAGE`, `SIZE`, and `REGION` keys. Additional values can be added for each key type. The following is an example data script:

```
IMAGE Microsoft Windows Server 2016 Base : ami-0f4c7e570f044b46f
IMAGE Amazon Linux AMI 2018.03.0 : ami-0080e4c5bc078760e
IMAGE Red Hat Enterprise Linux 7.6 (HVM) : ami-011b3ccf1bd6db744
SIZE a1.medium
SIZE a1.large
SIZE a1.xlarge
SIZE a1.2xlarge
SIZE a1.4xlarge
SIZE m4.large
SIZE m4.xlarge
SIZE m4.2xlarge
SIZE m4.4xlarge
SIZE m4.10xlarge
SIZE m4.16xlarge
SIZE m5.large
SIZE m5.xlarge
SIZE m5.2xlarge
SIZE m5.4xlarge
SIZE m5.12xlarge
SIZE m5.24xlarge
SIZE m5a.large
SIZE m5a.xlarge
SIZE m5a.2xlarge
SIZE m5a.4xlarge
SIZE m5a.12xlarge
SIZE m5a.24xlarge
SIZE m5d.large
SIZE m5d.xlarge
SIZE m5d.2xlarge
SIZE m5d.4xlarge
SIZE m5d.12xlarge
SIZE m5d.24xlarge
SIZE t2.nano
SIZE t2.micro
SIZE t2.small
SIZE t2.medium
SIZE t2.large
SIZE t2.xlarge
SIZE t2.2xlarge
SIZE t3.nano
SIZE t3.micro
SIZE t3.small
SIZE t3.medium
SIZE t3.large
SIZE t3.xlarge
SIZE t3.2xlarge
REGION AP_NORTHEAST_1
REGION AP_NORTHEAST_2
REGION AP_SOUTH_1
REGION AP_SOUTHEAST_1
REGION AP_SOUTHEAST_2
REGION CA_CENTRAL_1
REGION CN_NORTH_1
REGION CN_NORTHWEST_1
REGION EU_CENTRAL_1
REGION EU_NORTH_1
REGION EU_WEST_1
REGION EU_WEST_2
REGION EU_WEST_3
REGION SA_EAST_1
REGION US_EAST_1
REGION US_GOV_EAST_1
REGION US_WEST_1
REGION US_WEST_2
```

### Create the AWSEC2 agent definition

To create the AWSEC2 agent, complete the following steps:

1. Go to **Library** and select **Agents**.
2. Select **+Add**.
3. In the **Name** field, enter the name of the agent.
4. Select **AWSEC2** from the **Type** list.
5. In the **AWSEC2 Settings** section, enter the required information.
6. In the **Client Information** section:
   a. In the **Directory** field, enter the installation directory of the AWSEC2 Connector.
   b. In the **Name** field, enter `awsec2.exe` (default value).
   c. In the **Config File Name** field, enter `Connector.config` (default value).
7. In the **Config Script** section:
   a. Select **ACSAWSEC2** from the **Script Runner** list.
   b. Select the config script you previously created from the **Script** list.
8. In the **Drop-down Script** section:
   a. Select **ACSAWSEC2** from the **Script Runner** list.
   b. Select the data script you previously created from the **Script** list.
9. Select **Save**. The agent definition is saved and the connector is ready to use.

## FAQs

**What version of Java does the connector require?**

The connector uses an embedded OpenJDK Version 11 included in the installation package. No separate Java installation is required.

**Where do I find the EncryptValue utility?**

The `EncryptValue.exe` utility is included in the connector installation directory after extracting the `AWSEC2Connector-win.zip` file.

**Can I install the connector on a server that already has the Windows Agent?**

Yes. For the Enterprise Manager sub-type, the connector can be installed on any Windows system with a Windows agent. For the Solution Manager sub-type, the connector must be on the same server as the OpCon installation or the Relay installation.

**What OpCon version is required?**

The Enterprise Manager sub-type requires OpCon Release 19.0 or higher. The Solution Manager sub-type requires OpCon Release 25.0.3 or higher.

**What should I do if the AWS EC2 sub-type does not appear in Enterprise Manager after restart?**

Restart Enterprise Manager using **Run as Administrator**. After this restart, Enterprise Manager can be used normally.

## Glossary

**EncryptValue** — A utility included with the AWSEC2 Connector that encodes credential values for storage in the `Connector.config` file so that they are not held in plain text. Encoding obscures a credential; it does not protect it.

**Connector.config** — The configuration file for the AWSEC2 Connector, containing the connector name, debug setting, encoded AWS credentials, and OpCon API connection information.

**OpenJDK** — An open-source implementation of the Java Development Kit. The AWSEC2 Connector includes an embedded OpenJDK Version 11 and does not require a separate Java installation.

**dropins directory** — A directory in the Enterprise Manager installation used to add plugin modules such as the AWS EC2 job sub-type.

**AWSEC2Path** — A global property in OpCon that stores the full installation directory path of the AWSEC2 Connector, referenced in job definitions using `[[AWSEC2Path]]`.

**Related topics:**

- [AWSEC2 Connector Overview](./overview.md)
- [Enterprise Manager Sub-type Operation](./EM Subtype operation.md)
- [Solution Manager Sub-type Operation](./SM Subtype operation.md)
