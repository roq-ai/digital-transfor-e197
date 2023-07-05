const mapping: Record<string, string> = {
  alternatives: 'alternative',
  dimensions: 'dimension',
  domains: 'domain',
  organizations: 'organization',
  questions: 'question',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
