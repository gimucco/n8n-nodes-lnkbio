import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

const LNK_BIO_API_BASE_URL = 'https://lnk.bio/oauth/v1';

export class LnkBio implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Lnk.Bio',
		name: 'lnkBio',
		icon: 'file:lnkbio.svg',
		group: ['output'],
		version: 1,
		description: 'Create and manage links on Lnk.Bio',
		defaults: {
			name: 'Lnk.Bio',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Create Link',
						value: 'create',
						description: 'Create a new Lnk',
						action: 'Create a new link',
					},
					{
						name: 'Delete Link',
						value: 'delete',
						description: 'Delete an existing Lnk',
						action: 'Delete an existing link',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Title',
				description: 'The title shown in the button of the link',
				name: 'title',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'Example title',
				required: true,
			},
			{
				displayName: 'Destination URL',
				description: 'The URL users will be directed to when they click the link',
				name: 'link',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'https://example.com',
				required: true,
			},
			{
				displayName: 'Image URL',
				description: 'Optional image to display as thumbnail of the link',
				name: 'image',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
				default: 'https://cdn2.lnk.bi/profilepics/3159524853_20250127590.png',
			},
			{
				displayName: 'Lnk ID',
				name: 'linkId',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['delete'],
					},
				},
				default: 0,
				placeholder: '12345678',
				required: true,
			},
		],
		credentials: [
			{
				name: 'lnkBioOAuth2Api',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const operation = this.getNodeParameter('operation', 0);
		const results: INodeExecutionData[] = [];
		for (let i = 0; i < items.length; i++) {
			if (operation === 'create') {
				const title = this.getNodeParameter('title', i, items[i].json.title || '') as string;
				const link = this.getNodeParameter('link', i, items[i].json.link || '') as string;
				const image = this.getNodeParameter('image', i, items[i].json.image || '') as string;

				if (!/^https?:\/\//.test(link)) {
					throw new NodeOperationError(this.getNode(), 'Link must be a valid URL');
				}

				const body: any = { title, link };
				if (image) {
					if (!/^https?:\/\//.test(image)) {
						throw new NodeOperationError(this.getNode(), 'Image must be a valid URL for the Image');
					}
					body.image = image;
				}

				try {
					const response = await this.helpers.requestOAuth2.call(this, 'lnkBioOAuth2Api', {
						method: 'POST',
						url: `${LNK_BIO_API_BASE_URL}/lnk/add`,
						form: body,
					});

					results.push({
						json: {
							success: true,
							action: operation,
							data: response,
						},
					});
				} catch (error) {
					if (error.response?.data) {
						const message = typeof error.response?.data === 'object'
						? JSON.stringify(error.response.data)
						: error.response?.data || error.message;
						throw new NodeOperationError(this.getNode(), JSON.stringify(message), { itemIndex: i });
					}
					throw new NodeOperationError(this.getNode(), error, { itemIndex: i });
				}
			}
			if (operation === 'delete') {
				const linkId = this.getNodeParameter('linkId', i) as number;

				const body: any = { link_id: linkId };

				try {
					const response = await this.helpers.requestOAuth2.call(this, 'lnkBioOAuth2Api', {
						method: 'POST',
						url: `${LNK_BIO_API_BASE_URL}/lnk/delete`,
						form: body,
					});

					results.push({
						json: {
							success: true,
							action: operation,
							data: response,
						},
					});
				} catch (error) {
					if (error.response?.data) {
						const message = typeof error.response?.data === 'object'
						? JSON.stringify(error.response.data)
						: error.response?.data || error.message;
						throw new NodeOperationError(this.getNode(), JSON.stringify(message), { itemIndex: i });
					}
					throw new NodeOperationError(this.getNode(), error, { itemIndex: i });
				}
			}
		}

		return [results];
	}
}
