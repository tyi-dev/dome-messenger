import {Injectable} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {PrismaService} from "../../providers/prisma/prisma.service.ts";

@Injectable()
export class AlbumRepository {
    constructor(private readonly prisma: PrismaService) {}

    public async create(data: Prisma) {
        return this.prisma.album.create({ data });
    }