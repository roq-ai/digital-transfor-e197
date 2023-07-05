import { useSession } from '@roq/nextjs';
import { useGraphqlQuery } from 'lib/hooks/use-graphql-query';
import { Text } from '@chakra-ui/react';

interface AppLogoProps {
  isMobile?: boolean;
}
export const AppLogo = (props: AppLogoProps) => {
  const { isMobile } = props;

  const ownerRoles = [
    'lean-administrator',
    'organization-owner',
    'administrator',
    'assessment-creator',
    'transformation-agent',
    'business-owner',
    'department-manager',
    'department-analyst',
  ];
  const appName = `Digital Transformation Model`;

  const { session } = useSession();
  const { data } = useGraphqlQuery({
    query: `
      query Tenant($id: ID!){
        tenant(id: $id) {
          name
        }
    }
    `,
    variables: {
      id: session?.user?.tenantId,
    },
  });
  const isOwner = ownerRoles.some((role) => session?.user?.roles?.includes(role));
  const tenantName = data?.tenant?.name;
  if (isMobile) {
    return (
      <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        {isOwner ? tenantName : appName}
      </Text>
    );
  }
  return (
    <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
      {isOwner ? tenantName : appName}
    </Text>
  );
};
