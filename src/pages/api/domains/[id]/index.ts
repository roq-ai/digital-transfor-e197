import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { domainValidationSchema } from 'validationSchema/domains';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.domain
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDomainById();
    case 'PUT':
      return updateDomainById();
    case 'DELETE':
      return deleteDomainById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDomainById() {
    const data = await prisma.domain.findFirst(convertQueryToPrismaUtil(req.query, 'domain'));
    return res.status(200).json(data);
  }

  async function updateDomainById() {
    await domainValidationSchema.validate(req.body);
    const data = await prisma.domain.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDomainById() {
    const data = await prisma.domain.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
