import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { dimensionValidationSchema } from 'validationSchema/dimensions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.dimension
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDimensionById();
    case 'PUT':
      return updateDimensionById();
    case 'DELETE':
      return deleteDimensionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDimensionById() {
    const data = await prisma.dimension.findFirst(convertQueryToPrismaUtil(req.query, 'dimension'));
    return res.status(200).json(data);
  }

  async function updateDimensionById() {
    await dimensionValidationSchema.validate(req.body);
    const data = await prisma.dimension.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDimensionById() {
    const data = await prisma.dimension.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
