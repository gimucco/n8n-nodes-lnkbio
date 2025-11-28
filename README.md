# n8n-nodes-lnkbio

This is an n8n community node. It lets you use Lnk.Bio in your n8n workflows.

Lnk.Bio is a linkinbio service used by more than 1.5M creators to manage their social media links.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

Lnk.Bio only support 2 Actions: Create a Lnk, and Delete a Lnk.

There are no triggers, as Lnk.Bio is considered output-only when it comes to automation services.

## Credentials

You need a Client ID and Client Secret from Lnk.Bio to correctly authenticate your API calls.

1. Register a free account from https://lnk.bio/signup
2. Verify your email
3. Navigate to Tools => Developers/API
4. Create a new Public App to retrieve the Client ID and Client Secret.

Do note that if you're only looking to automate your own Lnk.Bio account, you won't need to go through app review.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Lnk.Bio help site](https://help.lnk.bio)
* [Lnk.Bio API specs](https://api.lnk.bio)

## Version history

* 0.2 - Added scheduled_from and scheduled_to parameters to align with the latest version of the Lnk.Bio APIs. The new parameters allow users to schedule links in advance and/or set an expiration date.

* 0.1.9 - Add pairedItem to response handling in LnkBio node

* 0.1.7 - Updated deprecated requestOAuth2 to httpRequestWithAuthentication; Implemented continueOnFail(); Removed includeCredentialsOnAuthorization and bodyFormat;

* 0.1.5 - Credentials fix

* 0.1.3 - Credentials fix

* 0.1.2 - Lint Fixes

* 0.1.0 - initial version


