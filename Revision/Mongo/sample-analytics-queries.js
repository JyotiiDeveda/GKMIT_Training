// 1 --- Find accounts that are associated with more than three different products.
db.accounts.aggregate([
	{
		$addFields: {
			"no_of_products": { $size: "products" }
		}
	},
	{
		$match: { $gt: [ "$no_of_products", 3 ] },
	}
]);

db.accounts.find({
	$where: "this.products.length > 3",
});

db.accounts.aggregate([
	{
		$match: {
			$expr: {	
				$gt: [{ $size: "$products" }, 3],
			},
		},
	},
]);

// 2 --- Find the top 5 customers based on the combined account limits of all their accounts.

db.customers.aggregate([
	{
		$unwind: "$accounts",
	},
	{
		$lookup: {
			from: "accounts",
			localField: "accounts",
			foreignField: "account_id",
			as: "customer_account",
		},
	},
	{
		$unwind: customer_account
	},
	{
		$group: {
			_id: "$_id",
			total_sum: { 
				$sum: "$customer_account.limit" 
			},
		},
	},
	{
		$sort: {
			total_sum: -1
		}
	},
	{
		$limit: 5
	}
]);


// without unwind 
db.customers.aggregate([
	{
		$lookup: {
			from: "accounts",
			localField: "accounts",
			foreignField: "account_id",
			as: "customer_account",
		},
	},
	{
		$project: {
			total_acnt_limit: {
				$sum: "$customer_account.limit",
			},
		},
	},
	{
		$sort: {
			total_acnt_limit: -1,
		},
	},
	{
		$limit: 5,
	},
]);


// filtered out fields that are only required
db.customers.aggregate([ 
	{ 
		$project: { 
			customer_id: "$_id", 
			_id: 0, 
			accounts: 1 
		} 
	}, 
	{ 
		$lookup: { 
			from: "accounts", 
			localField: "accounts", 
			foreignField: "account_id", 
			as: "customer_account" 
		} 
	}, 
	{ 
		$project: { 
			customer_id: 1,
			total_limit: { 
				$sum: "$customer_account.limit"
			} 
		}
	}, 
	{
		$sort: {
			total_limit: -1
		}
	},
	{ 
		$limit: 5 
	}
] );





// 3 --- Find the most common products in the accounts collection and count how many accounts have each product.

db.accounts.aggregate([
	{ $unwind: "$products" },
	{
		$group: {
			_id: "$products",
			count: { $count: {} },
		},
	},
	{ $sort: { count: -1 } },
	{ $limit: 1 },
]);

Output: [
	{ _id: "InvestmentStock", count: 1746 },
	{ _id: "CurrencyService", count: 742 },
	{ _id: "Brokerage", count: 741 },
	{ _id: "InvestmentFund", count: 728 },
	{ _id: "Commodity", count: 720 },
	{ _id: "Derivatives", count: 706 },
];

db.account.aggregate([
	{
		$facet: {
			account_prod_cnt: [{ $project: { account_id: 1 } }],
		},
	},
]);


// 4 --- Find the number of customers with inactive tiers.
db.customers.aggregate([
	{
		$project: {
			_id: 1,
			username: 1,
			tiers: {
				$objectToArray: "$tier_and_details",
			},
		},
	},
	{
		$match: {
			"tiers.v.active": false,
		},
	},
	{ 
		$count: "count" 
	}
]);

// count the number of inactive tiers for each customer
db.customers.aggregate([
	{
		$project: {
			_id: 1,
			username: 1,
			tiers: { $objectToArray: "$tier_and_details" },
		},
	},
	{ 
		$match: { 
			"tiers.v.active": false 
		} 
	},
	{
		$addFields: {
			'inactive_tier_cnt': {
				$size: {
					$filter: {
						input: "$tiers",
						cond: { 
							$eq: [ "$$this.v.active", false ]
						}
					}
				}
			}
		}
	},
	{ 
		$count: "count" 
	},
]);

// testing if a column can be added with $project
db.customers.aggregate([
	{
		$project: {
			_id: 1,
			username: 1,
			tiers: { $objectToArray: "$tier_and_details" },
		},
	},
	{
		$project: {
			'inactive_tier_cnt': {
				$size: {
					$filter: {
						input: "$tiers",
						cond: { 
							$eq: [ "$$this.v.active", false ]
						}
					}
				}
			}
		}
	},
	{ 
		$sort: { 
			inactive_tier_cnt: -1 
		} 
	},
	{ 
		$limit: 5 
	},
]);

db.customers.aggregate([ 
	{ 
		$project: { 
			_id: 1, 
			username: 1, 
			tiers: { 
				$objectToArray: "$tier_and_details" 
			} 
		} 
	}, 
	{ 
		$project: { 
			'inactive_tier_cnt': { 
				$size: { 
					$filter: { 
						input: "$tiers", 
						cond: { 
							$eq: ["$$this.v.active", false] 
						} 
					} 
				} 
			} 
		} 
	}, 
	{ 
		$sort: { 
			inactive_tier_cnt: -1 
		} 
	},
	{ 
		$limit: 5 
	}
] );




{
	$filter: {
		input: "$tiers",
		as: "tier",
		cond: { 
			$match: { 
				"$$tier.v.active": false 
			}
		}
	}
}













db.customers.aggregate([ 
	{ 
		$match: { 
			"tier_and_details": {} 
		} 
	}, 
	{ 
		$count: "empty_tiers_count" 
	} 
])



// Find all the roles in accounts table 
db.accounts.aggregate( [ 
	{ 
		$project: { 
			arr: { 
				$objectToArray: "$roles" 
			} 
		} 
	}, 
	{ 
		$unwind: "$arr"
	}, 
	{ 
		$group: { 
			_id: "$arr.k", 
			count: { 
				$count: {}
			}
		}
	}
] );


// Write a script to add a field of roles in each document of account

// Compare the previous roles and new roles if they match and create an excel sheet

// percentage of each role

// count of each role

excel js package



// map roles with their ids
db.accounts.aggregate([ 
	{ 
		$project: { 
			roles: { 
				$objectToArray: "$roles"
			} 
		} 
	}, 
	{ 
		$unwind: "$roles"
	}, 
	{ 
		$lookup: { 
			from: "roles", 
			localField: "roles.k", 
			foreignField: "name", 
			as: "accounts_roles"
		}
	}, 
	{ 
		$addFields: { 
			roles_id: "$accounts_roles._id" 
		} 
	}, 
	{ 
		$group: { 
			_id: { "$_id" }, 
			roles: { 
				$push: "$roles_id" 
			} 
		} 
	}
]);

// without unwind
db.accounts.aggregate([ 
	{ 
		$project: { 
			roles: { 
				$objectToArray: "$roles"
			} 
		} 
	}, 
	{ 
		$lookup: { 
			from: "roles_list", 
			localField: "roles.k", 
			foreignField: "name", 
			as: "accounts_roles"
		}
	}, 
	{ 
		$addFields: { 
			roles_id: "$accounts_roles._id" 
		} 
	} 
]);








