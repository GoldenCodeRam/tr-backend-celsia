-- CreateTable
CREATE TABLE "Measurement" (
    "id" SERIAL NOT NULL,
    "connectionDeviceId" TEXT NOT NULL,
    "eventProcessedUtcTime" TIMESTAMP(3) NOT NULL,
    "hefestoId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "varName" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "plugin" TEXT NOT NULL,
    "request" TEXT NOT NULL,
    "varName1" TEXT NOT NULL,
    "device" INTEGER NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);
