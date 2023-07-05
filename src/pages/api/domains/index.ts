import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { domainValidationSchema } from 'validationSchema/domains';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDomains();
    case 'POST':
      return createDomain();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDomains() {
    const data = await prisma.domain
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'domain'));
    return res.status(200).json(data);
  }

  async function createDomain() {
    await domainValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.question?.length > 0) {
      const create_question = body.question;
      body.question = {
        create: create_question,
      };
    } else {
      delete body.question;
    }
    const data = await prisma.domain.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
