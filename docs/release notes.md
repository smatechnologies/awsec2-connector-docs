---
sidebar_label: 'Release Notes'
---

# AWSEC2 Connector Release Notes

## General

The AWSEC2 Connector supports two sub-type options:

### Enterprise Manager
Enterprise Manager provides a sub-type plugin module that is copied into the Enterprise Manager plugins directory. The plugin provides a simple mechanism to create the commandline options required when executing the connector.

The sub-type exists as a Windows job sub-type **AWS EC2**. 

### Solution Manager
OpCon version 25.0.3 or greater includes the ACS framework. The ACS framework provides the sub-type mechanism supporting the AWSEC2 connector. It provides a mechanism to centralize the configuration file (Connector.config) within the OpCon environment and provides a wrapper to the AWSEC2 connector. 

THe supplied integration available from the FTP site in section integrations can be downloaded and the items extracted and copied into the **\\plugins\\ACSAWSEC2** directory. 

The implementation exists as an ACS Agent **AWSEC2** and associated job with several task types.

