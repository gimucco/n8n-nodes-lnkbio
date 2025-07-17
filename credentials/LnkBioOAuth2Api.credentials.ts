import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class LnkBioOAuth2Api implements ICredentialType {
	name = 'lnkBioOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'Lnk.Bio OAuth2 API';

	documentationUrl = 'https://api.lnk.bio/';

	properties: INodeProperties[] = [
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'string',
      default: '',
    },
    {
      displayName: 'Client Secret',
      name: 'clientSecret',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
    },
    {
      displayName: 'Auth URL',
      name: 'authUrl',
      type: 'hidden',
      default: 'https://lnk.bio/manage/access',
    },
    {
      displayName: 'Token URL',
      name: 'accessTokenUrl',
      type: 'hidden',
      default: 'https://lnk.bio/oauth/token',
    },
    {
      displayName: 'Scope',
      name: 'scope',
      type: 'hidden',
      default: 'basic',
    },
    {
      displayName: 'Include Credentials on Authorization',
      name: 'includeCredentialsOnAuthorization',
      type: 'boolean',
      default: true,
    },
    {
      displayName: 'Authentication Method',
      name: 'authentication',
      type: 'hidden',
      default: 'body',
    },
    {
      displayName: 'Token Request Format',
      name: 'bodyFormat',
      type: 'hidden',
      default: 'form-urlencoded',
    },
  ];
}
