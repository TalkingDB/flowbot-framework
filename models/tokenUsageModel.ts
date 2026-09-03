import mongoose, { Schema, Document } from 'mongoose';
import { ITokenUsage } from './userHistoryModel';

export interface IUserTokenUsage extends Document {
  userId: mongoose.Types.ObjectId;
  inputTokensUsed: number;
  outputTokensUsed: number;
  totalTokensUsed: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserTokenUsageSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    inputTokensUsed: {
      type: Number,
      default: 0,
      min: 0,
    },
    outputTokensUsed: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalTokensUsed: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export const UserTokenUsageModel =
  mongoose.models.UserTokenUsage ||
  mongoose.model<IUserTokenUsage>('UserTokenUsage', UserTokenUsageSchema);

//   --------------------------------------

export const upsertTokenUsage = async (
  userId: mongoose.Types.ObjectId,
  tokens: ITokenUsage,
) => {
  const inputTokens = tokens.input_tokens ?? 0;
  const outputTokens = tokens.output_tokens ?? 0;
  const totalTokens = tokens.total_tokens ?? 0;

  return await UserTokenUsageModel.findOneAndUpdate(
    { userId },
    {
      $inc: {
        inputTokensUsed: inputTokens,
        outputTokensUsed: outputTokens,
        totalTokensUsed: totalTokens,
      },
      $currentDate: {
        updatedAt: true,
      },
      $setOnInsert: {
        userId,
        createdAt: new Date(),
      },
    },
    {
      new: true,
      upsert: true,
    },
  );
};

export const getUserTokenUsage = async (
  userId: mongoose.Types.ObjectId,
) => {
  return await UserTokenUsageModel.findOne({ userId });
};

export default UserTokenUsageModel;