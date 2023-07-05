import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { dimensionValidationSchema } from 'validationSchema/dimensions';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDimensions();
    case 'POST':
      return createDimension();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDimensions() {
    const data = await prisma.dimension
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'dimension'));
    return res.status(200).json(data);
  }

  async function createDimension() {
    await dimensionValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.domain?.length > 0) {
      const create_domain = body.domain;
      body.domain = {
        create: create_domain,
      };
    } else {
      delete body.domain;
    }
    const data = await prisma.dimension.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
