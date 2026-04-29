---
sidebar_label: 'Release Notes'
title: 'AWSEC2 Connector release notes'
description: 'Version history and change details for the AWSEC2 Connector, including connector variant descriptions and configuration requirements.'
tags:
  - Reference
  - System Administrator
  - Automation Engineer
  - Agents
---

# AWSEC2 Connector release notes

## General

The AWSEC2 Connector supports two sub-type options for defining jobs in OpCon.

### Enterprise Manager

Enterprise Manager provides a sub-type plugin module that is copied into the Enterprise Manager plugins directory. The plugin provides a mechanism to create the command-line options required when running the connector.

The sub-type exists as a Windows job sub-type **AWS EC2**.

### Solution Manager

OpCon version 25.0.3 or greater includes the ACS framework. The ACS framework provides the sub-type mechanism supporting the AWSEC2 connector. It provides a mechanism to centralize the configuration file (`Connector.config`) within the OpCon environment and provides a wrapper to the AWSEC2 connector.

The supplied integration available from the FTP site in the Integrations section can be downloaded and the items extracted and copied into the `\plugins\ACSAWSEC2` directory.

The implementation exists as an ACS Agent **AWSEC2** and associated job with several task types.
